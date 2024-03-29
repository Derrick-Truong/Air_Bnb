const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser, validateReview, validateSpot, validatePage } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { sequelize, Op } = require('sequelize')


//Get all Spots
router.get('/',  async (req, res, next) => {
    // const validErr = {
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {}
    // };

    let pagination = {};
    let { page, size } = req.query;

    // page = parseInt(page)
    // size = parseInt(size)

    if (!page) page = 1
    if (!size) size = 20

    if(page < 1 || size < 1) {
      res.json({
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {
        "page": "Page must be greater than or equal to 0",
        "size": "Size must be greater than or equal to 0"
    }
})
    }

    if (size >= 1 && page >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1)

    req.pagination = pagination
    req.page = page
    req.size = size
    } else {
     pagination.limit = 20;
     pagination.offset = 0;
     req.pagination = pagination;
     req.page = 1;
     req.size = 20;
    }

    let spots = await Spot.findAll({
        ...req.pagination,
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]


    }
    )
    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
        // spotArray.push(spot.toJSON())
    })
    Spots.forEach(spot => {
        let adder = 0;
        let i = 0;
        spot.Reviews.forEach(review => {
            i++;
            adder = adder + review.stars
        })
        spot.avgRating = adder / i;
        spot.SpotImages.forEach(image => {
            if (image.url) {
                spot.previewImage = image.url
            }
        })
        delete spot.Reviews
        delete spot.SpotImages
    });

    res.json({
        "Spots":Spots, page:parseInt(req.page), size:parseInt(req.size)
 })

});


//Get all Spots with Current User
router.get('/current', requireAuth, async (req, res, next) => {
    let userId = req.user.id
    let spots = await Spot.findAll({
        where: {
            ownerId:userId
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]

    }
    )
    if (!spots) {
        return res.json({

        })
    }
    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
        // spotArray.push(spot.toJSON())
    })
    Spots.forEach(spot => {
    let adder = 0;
    let i = 0;
    spot.Reviews.forEach(review => {
        i++;
        adder= adder + review.stars
    })
    spot.avgRating = adder/i;
    spot.SpotImages.forEach(image => {
    if (image.url) {
        spot.previewImage = image.url
    }
    })
        delete spot.Reviews
        delete spot.SpotImages
    });


    res.json({Spots})
})



// Get details of a Spot from an id

router.get('/:id', async(req, res, next) => {
    let spotty = await Spot.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model:Review
            },
            {
                model:SpotImage,
                attributes:['id','url','preview']
            },
            {
                model:User,
                as: 'Owner',
                attributes: ['id','firstName','lastName']
            }
        ],

    });

    if (!spotty) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let count = 0;
    let spotjson = spotty.toJSON();
    spotjson.numReviews = spotty.Reviews.length;
    spotjson.Reviews.forEach(review => {
        count = count + review.stars
    })
   spotjson.avgStarRating = count/spotjson.numReviews
    delete spotjson.Reviews

    if (spotjson.SpotImages.length > 1) {
        if (spotjson.SpotImages[0].id !== spotjson.SpotImages[1].id) {
            for (let i = 1; i < spotjson.SpotImages.length; i++) {
                spotjson.SpotImages[i].preview = false
            }
        }
    }
 res.json(spotjson)
} );


// const validateSpot = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Street address is required"),
//     check('city')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("City is required"),
//     check('state')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("State is required"),
//     check('country')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Country is required"),
//     check('lat')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Latitude is not valid"),
//     check('lng')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Longitude is not valid"),
//     check('name')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Name is required")
//         .isLength({ max: 49})
//         .withMessage("Name must be less than 50 characters"),
//     check('description')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Description is required"),
//     check('price')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage("Price per day is required"),
//     handleValidationErrors
// ];

//Create Spot
router.post('/', [requireAuth, validateSpot],
    async (req, res, next) => {

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const spotAns = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.statusCode = 201
        res.json(spotAns)

    })


// Create an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, async(req, res, next) => {
    let image;
    const spotId = req.params.id;
    const {url, preview} = req.body
    let spotOne = await Spot.findOne({
        where: {
            id: spotId
        }
    })
    if (!spotOne) {
        res.status(404);
        return res.json({
            "message":"Spot couldn't be found"

        })
    }
    if(spotOne.ownerId !== req.user.id){
        res.status(403);
        return res.json({
            message:"Forbidden/not allowed"
        })
    }
    else{
    image = await spotOne.createSpotImage({
        spotId:spotId,
        url,
        preview

    })
}
return res.json({
    id: image.spotId,
    url: image.url,
    preview: image.preview
})
});

//Edit a Spot
router.put('/:id', requireAuth, validateSpot, async(req, res, next) => {
    let editSpot = await Spot.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!editSpot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (editSpot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden/not allowed",
            "statusCode": 403
        })
    }
    const {address, city, state, country, lat, lng, name, description, price } = req.body;

    editSpot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(editSpot)
});

//Create a Booking Based on a Spot id

router.post('/:id/bookings', requireAuth, async (req, res, next) => {
    const {startDate, endDate} = req.body

    const utcStartDate = new Date(startDate);
    const utcEndDate = new Date(endDate);

    const today = new Date();
    let spotBook = await Spot.findByPk(req.params.id)
    if (!spotBook) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spotBook.ownerId === req.user.id) {
        res.status(403);
        return res.json({
         "message": "Forbidden/not allowed",
         "statusCode": 403
        })
    }

        if (utcStartDate <= today || utcEndDate <= today) {
            res.status(400);
            return res.json({
                message: 'Validation error',
                statusCode: 400,
                errors: ['End date and start date must be after today'],
            });
        }


    if (startDate >= endDate) {
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": [
                "End date cannot be on or before start date"
            ]
        })
    }


    // let image;
    // let err = new Error('Sorry, this spot is already booked for the specified dates');
    // err.status = 403;

    let bookSpot = await Booking.findAll({
        where: {
            spotId:req.params.id
        }
    });
    let image;
    let err = new Error('Sorry, this spot is already booked for the specified dates');
    err.status = 403;
    err.title = 'Conflicting Dates'

    bookSpot.forEach(book => {
      if (endDate <= book.endDate && endDate > book.startDate) {
        err.errors = ["End date conflicts with an existing booking"]
      }
      if(startDate >= book.startDate && startDate < book.endDate) {
          err.errors = ["Start date conflicts with an existing booking"]
      }
      if(book.startDate > startDate && endDate > book.endDate) {
          err.errors = ["Start date conflicts with an existing booking",
              "End date conflicts with an existing booking"]
      }
    });

    if (err.errors) {
    return next(err)
    } else {
    image = await spotBook.createBooking({
        spotId: req.params.id,
        userId: req.user.id,
        startDate,
        endDate
    })
        return res.json(image)
    }

});

//Get a Booking based off Spot Id
router.get('/:id/bookings', async(req, res, next) => {
let findPk = await Spot.findByPk(req.params.id);

    if (!findPk) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": '404'
        })
    }
    let findBook = await Booking.findAll({
        where:{
            spotId: req.params.id
        },
        include: {
            model: User,
            attributes: ['id','firstName','lastName']
        }
    })

    let bookList = [];

    if (findBook[0].toJSON().userId !== req.user.id) {
      findBook.forEach(book => {
        bookList.push(book.toJSON())

      })
    return res.json({
        "Bookings": bookList
    })
    } else {
        return res.json({
         "Bookings":findBook
        })
    }
})

//Get Reviews by Spot Id
router.get('/:id/reviews', async(req, res, next) => {
let findSpot = await Spot.findByPk(req.params.id)

    if (!findSpot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

let findReview = await Review.findAll({
    where: {
        spotId:findSpot.id
    },
    include:[
        {
            model:User,
            attributes:['id','firstName','lastName']
        },
        {
            model:ReviewImage,
            attributes:['id','url']
        }
    ]
})
    if (!findSpot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // if (findReview.userId !== req.user.id) {
    //     return res.json({
    //         "message": "Forbidden/not allowed",
    //         "statusCode": 403
    //     })
    // }
        return res.json({
            "Reviews": findReview
        })

});




// const validateReview = [
//     check('review')
//     .exists({checkFalsy: true})
//     .notEmpty()
//     .withMessage("Review text is required"),
//    check('stars')
//    .exists({checkFalsey: true})
//     .isInt({min:1, max:5})
//     .withMessage("Stars must be an integer from 1 to 5"),
// handleValidationErrors
// ];

//Create a Review for a Spot
router.post('/:id/reviews', requireAuth, validateReview, async(req, res, next) => {

    const {review, stars} = req.body
    let findPk = await Spot.findByPk(req.params.id);

    if (!findPk) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": '404'
        })
    }

    let findReview = await Review.findOne({
        where: {
        [Op.and]:[
        {
            userId:req.user.id
        },
        {
            spotId:req.params.id
        }
        ]
        }
    })
    if (findReview) {
        res.status(403);
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    } else {
        const reviewAns = await findPk.createReview({
            userId: req.user.id,
            spotId: req.params.id,
            review,
            stars
        })
        // res.status(201);
  return  res.status(201).json(reviewAns)
    }


});

router.delete('/:id', requireAuth, async (req, res, next) => {

    let deleteSpot = await Spot.findOne({
        where: {
            id: req.params.id
        },

    })

    if (!deleteSpot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (deleteSpot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden/not allowed"
        })
    }

    await deleteSpot.destroy();
    res.status(200),
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })


})


module.exports = router;
