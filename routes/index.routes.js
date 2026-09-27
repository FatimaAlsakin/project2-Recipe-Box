const router = require("express").Router()
const Category = require('../models/Category')


router.get('/',async(req,res)=>{
    const categories = await Category.find()
    res.render('homepage.ejs', {categories})
})
module.exports = router;
