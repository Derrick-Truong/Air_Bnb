const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review } = require('../../db/models/review');
const Sequelize = require('sequelize');


router.get('/', async(req, res, next) => {
const all = await Spot.findAll()
return res.json({
    Spots:all
})

});

router.get('/:spotId', async(req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId)
    const spots = await Spot.findAll()

    let array = []
    for (let spot of spots) {87
        const spotJson = spot.toJSON()

    let reviews = await Review.findAll({
        where: {spotId: spotJson.id},
        attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
    })
    spotJson.avgRating = reviews[0].toJSON().avgRating
    array.push(spotJson)
    }
   res.json({ Spots: arrayrray[spotId]})
})

router.post('/', requireAuth,
 async(req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spots = await Spot.create({

    })
 })


module.exports = router;
