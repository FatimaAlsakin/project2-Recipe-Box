const router = require("express").Router()
const Category = require("../models/Category.js")


router.get('/new',(req,res)=>{
    res.render('category/new-category.ejs')
})

router.post('/', async (req,res)=>{
    const newCategory = await Category.create(req.body)
    res.redirect('/category')
})
module.exports = router;
