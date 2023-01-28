const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookRouter = require('./bookings.js');
const reviewRouter = require('./reviews.js')
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');


// const { User } = require('../../db/models');

router.use(restoreUser);

router.get('/test', requireAuth, (req, res) => {
    res.json({message: 'success'})
})
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use('/bookings', bookRouter);

router.use('/reviews', reviewRouter);

router.use('/spots', spotsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
