const router = require("express").Router()
const Comment = require('../models/Comment')
const isSignedIn = require('../middleware/is-signed-in')

router.post('/:rID',isSignedIn, async(req,res)=>{
    const comment = await Comment.create({
        text: req.body.text,
        author: req.session.user._id,
        recipe: req.params.rID
    })

    res.redirect(`/recipe/${req.params.rID}`)
})

router.delete('/:cID' , async (req,res) =>{ 
    const deletedComment = await Comment.findByIdAndDelete(req.params.cID)
    res.redirect(`/recipe/${deletedComment.recipe}`)
})

router.put('/:cID' , async (req,res) =>{ 
    const updatededComment = await Comment.findByIdAndUpdate(req.params.cID , {text: req.body.text})
    res.redirect(`/recipe/${updatededComment.recipe}`)
})
module.exports = router;