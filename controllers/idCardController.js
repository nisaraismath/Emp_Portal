const Employee = require("../models/empSchema");
const submitIdCardForm = async (req, res) => {
  const { employeeId, profileURL, phoneNumber, bloodGroup, dateOfBirth } =
    req.body;

  try {
    console.log("Received ID card submission request:", req.body);
    // Check if the employeeId exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Save ID card information to the employee document
    employee.profileURL = profileURL;
    employee.phoneNumber = phoneNumber;
    employee.bloodGroup = bloodGroup;
    employee.dateOfBirth = dateOfBirth;

    // Set idCardSubmitted to true
    employee.idCardSubmitted = true;

    // Save the employee document
    await employee.save();

    console.log("ID card information submitted successfully", employee);
    res
      .status(201)
      .json({
        message: "ID card information submitted successfully",
        employee,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error submitting ID card information", error: err });
  }
};

const getAllIdCardRequests = async (req, res) => {
  try {
    // Find all employees with isAdminApproved true but isIDCardApproved false
    const idCardRequests = await Employee.find({
      idCardSubmitted: true,
      isIDCardApproved: false,
    });

    res.status(200).json({ idCardRequests });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching ID card requests", error: err });
  }
};

const approveIdCardRequest = async (req, res) => {
  const { id, role } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the employee is already approved for ID card
    if (employee.isIDCardApproved) {
      return res.status(400).json({ message: "ID card request already approved" });
    }

    // Update the employee document
    employee.isIDCardApproved = true;
    employee.idApprovedBy.push(role);

    // Save the updated employee document
    await employee.save();

    res.status(200).json({ message: "ID card request approved by admin", employee });
  } catch (err) {
    res.status(500).json({ message: "Error approving ID card request", error: err });
  }
};

module.exports = {
  submitIdCardForm,
  getAllIdCardRequests,
  approveIdCardRequest,
};
