const express = require('express')
const router = express.Router(); 
const mapController = require('../controllers/map-controller')
const authMiddleware = require('../middlewares/auth-middleware');
const { validate } = require('../middlewares/validate-middleware');
const { rideSchema, searchDataSchema } = require('../validators/auth-validator');

//map
router.route('/get_origin_to_destination').post(validate(rideSchema), authMiddleware.verifyUser, mapController.get_origin_to_destination)
router.route('/get_suggestions_of_search_data').post(validate(searchDataSchema), mapController.get_suggestions_of_search_data) 

module.exports = router;