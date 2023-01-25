const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(req, res) => {
    const answer = await Spot.findAll({
    })
    return res.json(answer)
})
module.exports = router;
