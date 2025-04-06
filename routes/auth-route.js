const express = require('express'); 
const authMiddleware = require('../middlewares/auth-middleware');
const authController = require('../controllers/auth-controller'); 
const { validate } = require('../middlewares/validate-middleware');
const { userLoginSchema , userRegisterSchema, captainRegisterSchema, captainLoginSchema} = require('../validators/auth-validator');
const router = express.Router();
 

router.route('/user/register').post( validate(userRegisterSchema), authController.user_register)
router.route('/user/login').post( validate(userLoginSchema), authController.user_login)
router.route('/user/logout').get( authMiddleware.verifyUser, authController.user_logout)
router.route('/user/getProfile').get( authMiddleware.verifyUser, authController.get_user_profile);
 
router.route('/captain/register').post( validate(captainRegisterSchema), authController.captain_register)
router.route('/captain/login').post( validate(captainLoginSchema),  authController.captain_login)
router.route('/captain/logout').get( authMiddleware.verifyCaptain,  authController.captain_logout)
router.route('/captain/getProfile').get( authMiddleware.verifyCaptain,  authController.get_captain_profile);




module.exports = router;