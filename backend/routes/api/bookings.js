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
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
            include: {
                model: SpotImage
            }
        }

    })
    let array = [];
    bookingAns.forEach(book => {
        // array.push(book.toJSON())
        console.log(book.toJSON())
    })


})






module.exports = router;
