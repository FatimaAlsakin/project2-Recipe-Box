const router = require("express").Router()
const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment.js')
const isSignedIn = require('../middleware/is-signed-in.js');
const upload = require('../config/multer.js');
const Category = require('../models/Category.js')


router.get('/new', isSignedIn, async(req,res)=>{
    const categories =  await Category.find()
    res.render('recipe/new-recipe.ejs', {categories})
})

router.post('/', isSignedIn, upload.single('image'), async (req, res) => {

    if (!req.body.title || !req.body.description || !req.body.steps || !req.body.ingreName || !req.body.ingreQuan) {
        return res.render('recipe/new-recipe.ejs', { error: 'Title, Ingredients, and steps are required.' });
    }

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
        owner: req.session.user._id,
        image: req.file ? '/uploads/' + req.file.filename : undefined,
        category: req.body.category
    })
    res.redirect('/recipe')
});

router.get('/', async (req,res)=>{
    // const allRecipes = await Recipe.find()
    const filter = req.query.category ? { category: req.query.category } : {};
    const allRecipes = await Recipe.find(filter).populate('category');
    const categories = await Category.find({});

    let selectedCategory = null;
    if (req.query.category) {
        selectedCategory = await Category.findById(req.query.category);
    }

    res.render('recipe/all-recipes.ejs' , {allRecipes, categories, selectedCategory: req.query.category , selectedCategory})
})

router.get('/:rID' , async (req,res)=>{
    const recipe = await Recipe.findById(req.params.rID).populate('category')
    const comments = await Comment.find({recipe: req.params.rID}).populate('author')
    res.render('recipe/recipe-details.ejs', { recipe, comments, error: req.query.error });
})

router.delete('/:rID', isSignedIn, async(req , res) =>{
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.rID)
    res.redirect('/recipe')
})

router.get('/:rID/update' , isSignedIn ,async (req,res)=>{
    const recipe = await Recipe.findById(req.params.rID).populate('ingredients')
    res.render('recipe/recipe-update.ejs' , {recipe})
})

router.put('/:rID' , isSignedIn, async (req,res)=>{
    
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
        category: req.body.category
    })
    res.redirect(`/recipe/${req.params.rID}`)
})

module.exports = router;