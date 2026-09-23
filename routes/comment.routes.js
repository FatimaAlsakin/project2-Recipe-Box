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

module.exports = router;