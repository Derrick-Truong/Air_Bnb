const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//All reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {

    let reviews = await Review.findAll({
        where: {
            userId:req.user.id
        },
        include: [
            {
            model: User,
            attributes:['id','firstName','lastName']
        },
        {
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','price'],
            include: {
                model:SpotImage
            }
        },
           {
            model: ReviewImage,
            attributes:['id','url']
           }
    ]

    })
    let reviewArray = [];
    reviews.forEach(review => {
        reviewArray.push(review.toJSON())
    });
    reviewArray.forEach(review => {
        review.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                review.Spot.previewImage = image.url
            }
        })
        delete review.Spot.SpotImages
    })
 res.json({
    "Reviews":reviewArray
 })
})

//Get all reviews by a Spot's Id

module.exports = router;
