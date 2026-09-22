const router = require("express").Router()
const Recipe = require('../models/Recipe')
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

router.get('/',(req,res)=>{
    res.render('recipe/all-recipes.ejs')
})

module.exports = router;