// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const { handleValidationErrors } = require('./validation')
const { secret, expiresIn } = jwtConfig;
const { check } = require('express-validator');

// backend/utils/auth.js
// ...

// Sends a JWT Cookie

const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = ['Authentication required'];
    err.status = 401;
    return next(err);
};
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({min: 1})
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsey: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    // check('username')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    // check('password')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 6 })
    //     .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("First name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Last name is required"),
    check('username')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Username is required"),
    handleValidationErrors
];
const validatePage = [
    check('page')
    .isInt({ min: 1})
    .withMessage("Page must be greater than or equal to 1"),
    check('size')
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
    handleValidationErrors
];

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
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required")
         .isLength({ min: 30 })
        .withMessage("Description must be at least 30 characters"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required")
        .isNumeric()
        .withMessage("Price per day must be a number."),
    handleValidationErrors
];

const validateLogin = [

    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];



// const properAuth = function(req, _res, next) {

// }
// const requirePerm = function(req, _res, next) {
//     if ()
// };

module.exports = { validatePage, validateLogin, validateSpot, validateSignup, validateReview, setTokenCookie, restoreUser, requireAuth };
