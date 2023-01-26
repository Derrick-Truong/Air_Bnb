const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const Sequelize = require('sequelize');


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
    let spotArray = [];
    spots.forEach(spot => {
        console.log(spot.toJSON())
        // spotArray.push(spot.toJSON())
    })
})

router.get('/', async (req, res, next) => {
    const all = await Spot.findAll()
    return res.json({
        Spots: all
    })

});

//Get all Spots with Current Id

// router.get('/', async(req, res) => {

//     const spots = await Spot.findAll()

//     let array = []
//     for (let spot of spots) {
//         const spotJson = spot.toJSON()

//     let reviews = await Review.findAll({
//         where: {spotId: spotJson.id},
//         attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
//     })
//     spotJson.avgRating = reviews[0].toJSON().avgRating
//     array.push(spotJson)
//     }
//    res.json({ Spots: array})
// });
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 49})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required"),
    handleValidationErrors
];

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

// Add an Image to a Spot based on the Spot's id
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
            message:"Spot couldn't be found"
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
res.json({
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
            message: 'Spot does not exist at this id'
        })
    }
    if (editSpot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden/not allowed'
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

//Get Spots




module.exports = router;
