const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    ingredients:{
        type: [String],
        required: true
    },
    steps:{
        type:[String],
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
}, {timestamps: true});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
