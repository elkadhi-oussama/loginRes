//importation 
const mongoose = require("mongoose")
//end
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type : String,
        required: true,
        min : 3,
        max:15
    },
    price : Number,
    image : Array,
    descr: String,
})

const product = mongoose.model("product", productSchema)

module.exports = product

