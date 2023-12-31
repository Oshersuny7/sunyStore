const mongoose = require("mongoose")


const reviewSchema = mongoose.Schema({
   comment:{
    type:String,
    required:true
   },
   rating:{
    type:String,
    required:true
   },
   user:{
    _id:{type:mongoose.Schema.Types.ObjectId},
    name:{type:String,
      required:true}
   }
},{
    timestamps: true,
})

exports.ReviewModel = mongoose.model("reviews", reviewSchema)

