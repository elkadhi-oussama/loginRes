const express = require("express")
const Router = express.Router
const Product = require("../Models/product");
const router = Router()

//CRUD for Product
// POST METHOD
router.post("/product", async (req, res) => {
    const { name, price, image, descr } = req.body;
    try {
      const newProduct = new Product({ name, price, image, descr });
      await newProduct.save();
      res.status(200).send({ msg: "Product is saved", response: newProduct });
    } catch (error) {
      res.status(500).send("Can not save a product ", error);
    }
  });
  // GET METHOD
  router.get("/product", async (req, res) => {
    try {
      const allProduct = await Product.find();
  
      res.status(200).send({ allData: allProduct });
    } catch (error) {
      res.status(500).send("Can not get all products ", error);
    }
  });
  // DELETE METHOD
  router.delete("/:id", async (req, res) => {
    try {
      const proDeleted = await Product.deleteOne({ _id: req.params.id });
      proDeleted.deletedCount
        ? res.status(200).send({ msg: "Product deleted", response: proDeleted })
        : res.status(400).send("Product already deleted ");
    } catch (error) {
      res.status(500).send("Can not delete product ", error);
    }
  });
  
  //UPDATE METHOD
  router.put("/:id", async (req, res) => {
    try {
      const upProduct = await Product.updateOne({
        _id: req.params.id,
        $set: { ...req.body },
      });
      upProduct.modifiedCount
        ? res.status(200).send({ msg: "Product Updated", response: upProduct })
        : res.status(400).send("Product already updated ");
    } catch (error) {
      res.status(500).send("Can not update product ", error);
    }
  });
  
  //end


  module.exports = router