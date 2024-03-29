const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');


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
    if (bookingAns) {}
    let Bookings = [];
    bookingAns.forEach(book => {
        Bookings.push(book.toJSON())
    })

    Bookings.forEach(book => {
        book.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
        book.Spot.previewImage = image.url
            }
        })
        book.previewImage = book.Spot.previewImage
    })

 res.json({
   Bookings
 })
});

//Edit a booking (update and return an existing booking)


router.put('/:id', requireAuth,  async (req, res, next) => {
const {startDate, endDate} = req.body
    const utcStartDate = new Date(startDate);
    const utcEndDate = new Date(endDate);
    const today = new Date();

let currentBook = await Booking.findByPk(req.params.id);


if (!currentBook) {
    res.status(404)
    return res.json({
        "message": "Booking couldn't be found",
        "statusCode": 404
    })
}

if (currentBook.userId !== req.user.id) {
    res.status(403);
    return res.json({
        "message": "Forbidden/not allowed",
        "statusCode": 403
    })
};
    if (utcStartDate <= today || utcEndDate <= today) {
        res.status(400);
        return res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: ['End date and start date must be after today'],
        });
    }

if (startDate > endDate) {
    res.status(400);
    return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": [
            "endDate cannot be before startDate"
        ]
    })
};

let present = new Date();

if (new Date(startDate) < present || new Date(endDate) < present) {

    return res.json({
        "message": "Past bookings can't be modified",
        "statusCode": 403
    })
};

    let bookSpot = await Booking.findAll({
        where: {
            spotId: req.params.id
        }
    });

    const err = new Error('Sorry, this spot is already booked for the specified dates');
    err.status = 403;
    err.title = 'Conflicting Dates'

    bookSpot.forEach(book => {
        if (book.id !== currentBook.id) if (endDate <= book.endDate && endDate > book.startDate) {
            err.errors = ["End date conflicts with an existing booking"]
        }
        if (startDate >= book.startDate && startDate < book.endDate) {
            err.errors = ["Start date conflicts with an existing booking"]
        }
        if (book.startDate > startDate && endDate > book.endDate) {
            err.errors = ["Start date conflicts with an existing booking",
                "End date conflicts with an existing booking"]
        }
 }) ;

    if (err.errors) {
        return next(err)
    }
      currentBook.update({
            startDate,
            endDate
        })
    res.json(currentBook);
    }
);

router.delete('/:id', requireAuth, async (req, res, next) => {
    let deleteBook = await Booking.findByPk(req.params.id)

    if (!deleteBook) {
     res.status(404);
     return res.json({
         "message": "Booking couldn't be found",
         "statusCode": 404
     })
    };

    if (deleteBook.userId !== req.user.id && deleteBook.spotId !== req.params.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden/not allowed"
        })
    };
    let present = new Date();
    if (new Date(deleteBook.startDate) <= present) {
        res.status(403);
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    };
    await deleteBook.destroy();
    res.status(200),
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })


})
// router.get('/:id', )



module.exports = router;
