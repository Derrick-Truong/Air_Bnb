const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser, validateSignup, validatePage } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// const validateSignup = [
//     check('email')
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage('Please provide a valid email.'),
//     check('username')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 4 })
//         .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//         .not()
//         .isEmail()
//         .withMessage('Username cannot be an email.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 6 })
//         .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
// ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { firstName, lastName, email, username, password} = req.body;

        let sameEmail = await User.findOne({
            where: {
                email
            }
        })
        let sameUser = await User.findOne({
            where: {
                username
            }
        })
        const err = new Error('Sorry, this spot is already booked for the specified dates');
        err.status = 403;
        err.title = 'Conflicting Dates'
        if (sameEmail && !sameUser) {
        //    res.status(403);
        //    return res.json({
            //    "message": "User already exists",
            //    "statusCode": 403,
               err.errors = [
                   "User with that email already exists"
               ]
            return next(err);
        //    })
        }
        if (sameUser && !sameEmail) {
        //     res.status(403);
        //   return res.json({
        //       "message": "User already exists",
        //       "statusCode": 403,
            err.errors = [
                "User with that username already exists"
            ]
            return next(err);
            //   errors: {
            //       "email": "User with that email already exists"
            //   }
        //   })
        }

        if (sameUser && sameEmail){
        //   res.status(403);
        //   return res.json({
        //       "message": "User already exists",
        //       "statusCode": 403,
              err.errors = [
                  "User with that username already exists"
              ]
            return next(err);
            //   errors: {
            //       "email": "User with that email already exists",
            //       "username": "User with that username already exists"
            //   }
        //   })
        }

        if (err.errors) {
            return next(err)
        }

        const user = await User.signup({ firstName, lastName, email, username, password});

        await setTokenCookie(res, user);

        return res.json({
           user: user
        });
    },

);



module.exports = router;
