console.clear();
// importation
const express = require("express");
const mongoose = require("mongoose");
const routerProduct = require("./router/productRouter.js");
const routerUser = require("./router/userRouter.js");
//end
// declaration of variable
const app = express();
// read data form .env file
require("dotenv").config();
//end

//middleware
app.use(express.json());

//end middleware
const PORT = process.env.PORT;
const url = process.env.URL_DB;
//end

//connection to dataBase
mongoose
  .connect(url)
  .then(console.log("dataBase is Connect"))
  .catch((err) => console.log("can not connected to dataBase ", err));
//end
//CRUD
app.use("/product", routerProduct);
app.use("/user", routerUser);

//end CRUD

// lancement du serveur

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on Port ${PORT}`);
});
