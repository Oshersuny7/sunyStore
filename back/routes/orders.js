const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn,verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const OrderModel = require("../models/OrderModel");
const { ProductModel } = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders=async (req, res, next) => {
    try {
        const orders = await OrderModel.find({user:ObjectId(req.user._id)})
        res.send(orders)
    } catch (error) {
        next(error);
    }
}

const getOrder = async (req, res, next) => {
    try {
       const order = await OrderModel.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail();
        res.send(order);
    } catch (err) {
        next(err)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const { cartItems, orderTotal, paymentMethod } = req.body;
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }

        let ids = cartItems.map((item) => {
            return item.productID;
        })
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        })

        await ProductModel.find({ _id: { $in: ids } }).then((products) => {
            products.forEach(function (product, idx) {
                product.sales += qty[idx];
                product.save();
            })
        })

        const order = new OrderModel({
            user: ObjectId(req.user._id),
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
        })
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);

    } catch (err) {
        next(err)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await OrderModel.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);

    } catch (err) {
        next(err);
    }
}

const updateOrderToDelivered = async (req, res, next) => {
    try {
       const order = await OrderModel.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.findById({}).populate("user","-password").sort({ paymentMethod: "desc" });
        res.send(orders);
    } catch (err) {
        next(err)
    }
}

const getOrderForAnalysis = async (req, res, next) => {
    try {
        const start = new Date(req.params.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.date);
        end.setHours(23, 59, 59, 999);

        const order = await OrderModel.find({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({ createdAt: "asc" });
        res.send(order);

    } catch (err) {
        next(err)
    }
}

//user routes
router.use(verifyIsLoggedIn)

router.get("/",getUserOrders);

router.get("/user/:id",getOrder);

router.post("/",createOrder);

router.put("/paid/:id",updateOrderToPaid);

//admin routes
router.use(verifyIsAdmin)

router.put("/deliverd/:id",updateOrderToDelivered)

router.get("/admin",getOrders)

router.get("/analytics/:date",getOrderForAnalysis)



module.exports = router;