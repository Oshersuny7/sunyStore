const express = require("express");
const {UserModel} = require("../models/UserModel")
const ReviewModel = require("../models/ReviewModel")
const ProductModel = require("../models/ProductModel")
const {hashPassword,comparePasswords} = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middlewares/verifyAuthToken");
const router = express.Router();

const getUsers = async(req, res,next) => {
try {
  const users = await UserModel.find({}).select("-password")
  return res.json(users);
  
} catch (error) {
  next(error)
}  

}

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password, isAdmin } = req.body;

    // Validate that all required fields are present
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Check if the user already exists with the provided email
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).send("User already exists");
    } else {
      // Hash the password before saving it to the database
      const hashedPassword = hashPassword(password);

      // Create a new user with the provided details
      const user = await UserModel.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        isAdmin: isAdmin || false, // Set isAdmin to true if provided, otherwise default to false
      });

      // Respond with a success message and user details
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs required");
    }

    const user = await UserModel.findOne({ email }).orFail();

    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }

      const authToken = generateAuthToken(
        user._id,
        user.name,
        user.lastName,
        user.email,
        user.isAdmin
      );

      console.log("User logged in:", {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      // Debugging: Log the generated token
      console.log("Generated Token:", authToken);

      return res
        .cookie("access_token", authToken, cookieParams)
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const user = await UserModel.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async(req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).orFail()
    res.json(user);
    
  } catch (error) {
    next(error);
  }
}

const writeReview = async (req, res, next) => {
  try {
const session = await ReviewModel.startSession();


      // get comment, rating from request.body:
      const { comment, rating } = req.body;
      // validate request:
      if (!(comment && rating)) {
          return res.status(400).send("All inputs are required");
      }

      // create review id manually because it is needed also for saving in Product collection
      const ObjectId = require("mongodb").ObjectId;
      let reviewId = ObjectId();

      session.startTransaction();


      await ReviewModel.create([
          {
              _id: reviewId,
              comment: comment,
              rating: Number(rating),
              user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
          }
      ],{session:session})

      const product = await ProductModel.findById(req.params.productId).populate
      ("reviews").session(session)
      
      const alreadyReviewed = product.reviews.find((r)=>r.user._id.toString()
      === req.user._id.toString());
      if(alreadyReviewed){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).send("product already reviewed")
      }


      let prc=[...product.reviews]
      prc.push({rating:rating})
      product.reviews.push(reviewId)
      if(product.reviews.length===1){
        product.rating = Number(rating);
        product.reviewsNumber=1;
      }else{
        product.reviewNumber = product.reviews.length;
        product.rating =prc.map((item)=>Number(item.rating)).reduce((sum,
          item)=>sum+item,0)/product.reviews.length
      }
      await product.save();

      await session.commitTransaction();
      session.endSession();
      res.send('review created')
  } catch (err) {
    await session.abortTransaction();
      next(err)   
  }
}

const getUser = async(req,res,next)=>{
  try {
    const user = await UserModel.findById(req.params.id).select("name lastName email isAdmin ").orFail()
    return res.send(user)
    
  } catch (error) {
    next(error)
  }
}

const updateUser = async(req,res,next)=>{
  try {
    const user = await UserModel.findById(req.params.id).orFail();
    
    user.name = req.body.name||user.name;
    user.lastName = req.body.lastName||user.lastName;
    user.email = req.body.email||user.email;
    user.isAdmin = req.body.isAdmin||user.isAdmin;

    await user.save();
    res.send("user updated");

  } catch (error) {
    next(error)
  }
}

const deleteUser = async(req,res,next)=>{
  try {
    const user = await UserModel.findById(req.params.id).orFail();
    await user.remove();
    res.send("user removed");
    
  } catch (error) {
    next(error)
  }
}

router.post("/register",registerUser)
router.post("/login",loginUser)


//user logged in routes:

router.use(verifyIsLoggedIn)
router.put("/profile",updateUserProfile)
router.get('/profile/:id',getUserProfile)
router.post('/review/:productId',writeReview)

// admin routes:
router.use(verifyIsAdmin)

router.get("/",getUsers)

router.get("/:id",getUser)

router.put("/:id",updateUser)

router.delete("/:id",deleteUser)

module.exports = router;