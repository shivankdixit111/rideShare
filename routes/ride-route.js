const authMiddleware = require('../middlewares/auth-middleware')
const rideController = require('../controllers/ride-controller')

const express = require('express');
const { validate } = require('../middlewares/validate-middleware');
const { confirmRideSchema } = require('../validators/auth-validator');
const router = express.Router();

//captain confirms ride and sends message to user via socket.io
router.post('/confirm',validate(confirmRideSchema), authMiddleware.verifyCaptain, rideController.confirmRide)

module.exports = router;