const indexR = require("./index");
const usersR = require("./users");
const categoriesR = require("./categories");
const ordersR = require("./orders");
const productsR = require("./products");
const jwt = require("jsonwebtoken");

exports.routesInit = (app) => {
  app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
   });

  app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
   })

  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/categories", categoriesR);
  app.use("/products", productsR);
  app.use("/orders", ordersR);

}

