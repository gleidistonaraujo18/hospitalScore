import express from 'express'
import UserController from '../controllers/UserController';
import HospitalController from '../controllers/HospitalController';
import EvaluationController from '../controllers/EvaluationController';
const router = express.Router();


router.get('/', function (request: any, response: any) {
    return response.status(200).json({ message: "Api Hospital Score" });
});


router.post('/user/auth', UserController.authenticate);
router.post('/user', UserController.registerUser);
router.patch('/user/:id?', UserController.updateUser)
router.get('/user/:id?', UserController.getById);


router.post('/hospital', HospitalController.createHospital);
router.get('/hospital', HospitalController.getAll);
router.get('/hospital/user/:id?', HospitalController.getHospitalsNotEvaluatedByUser);

router.post('/evaluation', EvaluationController.register);

export default router;