const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');


router.delete('/:id', requireAuth, async(req, res, next) => {
    let deleteReview = await ReviewImage.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!deleteReview) {

        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    let deleteReview2 = await Review.findOne({
        where: {
            id: deleteReview.reviewId
        }
    })
    if (deleteReview2.userId !== req.user.id) {

        return res.json({
            "message": "Forbidden/not allowed",
            "statusCode": 403
        })
    }
    else {
        await deleteReview.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})


module.exports = router;
