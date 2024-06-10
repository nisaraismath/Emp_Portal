const Employee = require('../models/empSchema');

const submitAssetRequest = async (req, res) => {
  const { employeeId, assetName, assetType, quantity, isWithCharger, isWithMouse } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.assetName = assetName;
    employee.assetType = assetType;
    employee.quantity = quantity;
    employee.isWithCharger = isWithCharger;
    employee.isWithMouse = isWithMouse;
    employee.assetSubmitted = true;

    await employee.save();

    res.status(201).json({ message: 'Asset request submitted successfully', employee });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting asset request', error: err });
  }
};

const getAllAssetRequests = async (req, res) => {
  try {
    const assetRequests = await Employee.find({ assetSubmitted: true, isAssetApproved: false });

    res.status(200).json({ assetRequests });
  } catch (err) {
    res.status (500).json({ message: 'Error fetching asset requests', error: err });
  }
};

const approveAssetRequest = async (req, res) => {
  const { id,role } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (employee.isAssetApproved) {
      return res.status(400).json({ message: 'Asset request already approved' });
    }
    employee.isAssetApproved = true;
    employee.assetApprovedBy.push(role);

    const lastAsset = await Employee.findOne({ assetId: { $exists: true } })
    .sort({ assetId: -1 })
    .exec();

  let nextAssetId = 'ASSET00001'; // Default first ID

  if (lastAsset && lastAsset.assetId) {
    const lastIdNumber = parseInt(lastAsset.assetId.slice(5)) + 1;
    nextAssetId = `ASSET${lastIdNumber.toString().padStart(5, '0')}`;
  }

 
  employee.assetId = nextAssetId;
  employee.assetApprovalDate = Date.now();

    await employee.save();

    res.status(200).json({ message: 'Asset request approved by asset team', employee });
  } catch (err) {
    res.status(500).json({ message: 'Error approving asset request', error: err });
  }
};
const rejectAssetRequest = async (req, res) => {
    const { id, role } = req.body;
  
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      if (employee.isAssetApproved) {
        return res.status(400).json({ message: 'Asset request already approved' });
      }
      employee.isAssetApproved = false;
      employee.assetApprovedBy.push(role);
  
      // Set isAssetApproved to false and assetSubmitted to false
      employee.assetSubmitted = false;
  
      await employee.save();
      res.status(200).json({ message: 'Asset request rejected by asset team', employee });
    } catch (err) {
      res.status(500).json({ message: 'Error rejecting asset request', error: err });
    }
  };
module.exports = {
  submitAssetRequest,
  getAllAssetRequests,
  approveAssetRequest,
  rejectAssetRequest
};
