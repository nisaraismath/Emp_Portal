
const express = require('express');
const router = express.Router();
const employeeRouter = require('../controllers/empController');
const idcardRouter = require('../controllers/idCardController');
const assetRouter = require('../controllers/assetController');



router.post('/submit-doc',employeeRouter.submitEmployeeForm);
router.get('/get-approval',employeeRouter.getAllNewApproval);
router.put('/update-approval',employeeRouter.approveEmployee);
router.get('/approved-employees', employeeRouter.getAllApprovedEmployees);


router.post('/idcard-submit',idcardRouter.submitIdCardForm);
router.get('/get-idcard-request',idcardRouter.getAllIdCardRequests);
router.put('/idcard-approval',idcardRouter.approveIdCardRequest);

router.post('/asset-submit',assetRouter.submitAssetRequest);
router.get('/asset-request',assetRouter.getAllAssetRequests);
router.put('/asset-approval',assetRouter.approveAssetRequest);
router.put('/asset-reject',assetRouter.rejectAssetRequest)

module.exports=router;