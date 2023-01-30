
const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser, validateReview, validateSpot } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { sequelize, Op } = require('sequelize');


router.delete('/:id', requireAuth, async(req, res, next) => {
    let deleteSpot = await SpotImage.findOne({
        where: {
            id: req.params.id
        }

    });

    if (!deleteSpot) {

        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    };

    let findSpot = await Spot.findOne({
        where: {
            id: deleteSpot.spotId
        }
    });

    if (findSpot.ownerId !== req.user.id) {
        return res.json({
            "message": "Forbidden/not allowed",
            "statusCode": 403
        })
    } else {

    await deleteSpot.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
    }

})


module.exports = router;
