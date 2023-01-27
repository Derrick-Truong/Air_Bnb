const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const Sequelize = require('sequelize');

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
    let bookingAns = await Booking.findAll({
        where:{
            userId: req.user.id
        },
        include:{
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','name','price'],
            include: {
                model:SpotImage
            }
        }

    })
    let bookArray = [];
    bookingAns.forEach(book => {
        bookArray.push(book.toJSON())
    })

    bookArray.forEach(book => {
        book.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
        book.Spot.previewImage = image.url
            }
        })
        delete book.Spot.SpotImages
    })

 res.json({
    "Bookings":bookArray
 })
});




module.exports = router;
