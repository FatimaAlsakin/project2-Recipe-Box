const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    quantity:{
        type: String
    }
}, {_id: false});

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    ingredients:[ingredientSchema],
    steps:{
        type:String,
        required: true
    },
    cookTime:{
        type: Number
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {timestamps: true});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
