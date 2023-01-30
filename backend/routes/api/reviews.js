const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, valid, restoreUser, validateReview } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');


//All reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {

    let reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price'],
                include: {
                    model: SpotImage
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
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
    return res.json({
        "Reviews": reviewArray
    })
});

//Add an Image to a Review based on the Review's id
router.post('/:id/images', requireAuth, async (req, res, next) => {
    let reviewAns = await Review.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: ReviewImage
        },
    })

    if (!reviewAns) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewAns.userId !== req.user.id) {
        res.status(403);
        return res.json({
            'message': 'Forbidden/not allowed',
            'statusCode': 403
        })
    }
    if (reviewAns.ReviewImages.length >= 10) {
        res.status(403);
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    const { url } = req.body
    const createImage = await reviewAns.createReviewImage({
        reviewId: reviewAns.id,
        url

    })
    return res.json({
        "id": createImage.id,
        "url": createImage.url
    }
    )
});

//Edit a Review

router.put('/:id', requireAuth, validateReview, async (req, res, next) => {

    let reviews = await Review.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!reviews) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviews.userId !== req.user.id) {
        res.status(403);
        return res.json({
            'message': 'Forbidden/not allowed',
            'statusCode': 403
        })
    }
    let { review, stars } = req.body
    reviews.update({
        review,
        stars
    })
    res.json(reviews)

});

router.delete('/:id', requireAuth, async (req, res, next) => {
    let deleteReview = await Review.findByPk(req.params.id);

    if (!deleteReview) {
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };
    if (deleteReview.userId !== req.user.id) {

        return res.json({
            "message": "Forbidden/not allowed",
            "statusCode": 403
        })
    };

    await deleteReview.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200

    })

});






module.exports = router;
