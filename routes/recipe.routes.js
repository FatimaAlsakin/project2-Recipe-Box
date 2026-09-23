const router = require("express").Router()
const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment.js')
const isSignedIn = require('../middleware/is-signed-in.js');



router.get('/new',(req,res)=>{
    res.render('recipe/new-recipe.ejs')
})

router.post('/', async (req, res) => {

    const names = [].concat(req.body.ingreName || []);
    const quantities = [].concat(req.body.ingreQuan || []);
    req.body.ingredients = names
        .map((name, i) => ({ name, quantity: quantities[i] }))
        .filter(ing => ing.name.trim() !== '');

    await Recipe.create({
        title: req.body.title,
        description: req.body.description,
        ingredients:req.body.ingredients,
        cookTime: req.body.cookTime,
        steps: req.body.steps,
        owner: req.session.user._id
    })
    res.redirect('/recipe')
});

router.get('/', async (req,res)=>{
    const allRecipes = await Recipe.find()
    res.render('recipe/all-recipes.ejs' , {allRecipes})
})

router.get('/:rID' , async (req,res)=>{
    const recipe = await Recipe.findById(req.params.rID).populate('ingredients')
    const comments = await Comment.find({recipe: req.params.rID}).populate('author')
    res.render('recipe/recipe-details.ejs' , {recipe , comments})
})

router.delete('/:rID', async(req , res) =>{
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.rID)
    res.redirect('/recipe')
})

router.get('/:rID/update' , isSignedIn ,async (req,res)=>{
    const recipe = await Recipe.findById(req.params.rID).populate('ingredients')
    res.render('recipe/recipe-update.ejs' , {recipe})
})

router.put('/:rID' , async (req,res)=>{
    
    const names = [].concat(req.body.ingreName || []);
    const quantities = [].concat(req.body.ingreQuan || []);
    req.body.ingredients = names
        .map((name, i) => ({ name, quantity: quantities[i] }))
        .filter(ing => ing.name.trim() !== '');

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.rID , {
        title: req.body.title,
        description: req.body.description,
        ingredients:req.body.ingredients,
        cookTime: req.body.cookTime,
        steps: req.body.steps,
    })
    res.redirect(`/recipe/${req.params.rID}`)
})

module.exports = router;