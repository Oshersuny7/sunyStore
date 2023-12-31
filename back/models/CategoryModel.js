const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 150,
        required:true
    },
    description: {
        type: String,
        default: "description",
        maxlength: 150,
        required:true
    },
    image: {
        type: String,
        default: "/images/logo192.png",
        required:true
    },
    attrs: [{
        key: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            
        },
        value: [{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
        }],
    }],
}, {
    timestamps: true,
});

categorySchema.index({ description: 1 });

exports.CategoryModel = mongoose.model("Categories", categorySchema);

