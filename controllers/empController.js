const Employee = require('../models/empSchema');

// Function to submit the employee form
const submitEmployeeForm = async (req, res) => {
  const { name, email, gender, department, education, documents } = req.body;

  try {
    const newEmployee = new Employee({
      name,
      email,
      gender,
      department,
      education,
      documents,
      
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee form submitted successfully', employee: newEmployee });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting employee form', error: err });
  }
};

const getAllNewApproval = async (req,res) =>{
    try{
        const allNewApproval = await Employee.find ({isHRApproved: false });
        return res.status(200).json({
            data:allNewApproval,
            msg:"New Approval"
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({error:"server error"})
    }
    };

  
const approveEmployee = async (req, res) => {
  const { id, role } = req.body; // Assuming role is passed indicating HR or Assistant HR

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the employee is already approved
    if (employee.isHRApproved) {
      return res.status(400).json({ message: 'Employee already approved by HR' });
    }

    // Approve the employee and set isHRApproved to true
    employee.isHRApproved = true;
    employee.approvedBy.push(role);

    const lastEmployee = await Employee.findOne({ employeeId: { $exists: true } })
      .sort({ employeeId: -1 })
      .exec();

    let nextEmployeeId = 'EMP00001'; // Default first ID

    if (lastEmployee && lastEmployee.employeeId) {
      // Extract the numeric part, increment it, and format it with leading zeros
      const lastIdNumber = parseInt(lastEmployee.employeeId.slice(3)) + 1;
      nextEmployeeId = `EMP${lastIdNumber.toString().padStart(5, '0')}`;
    }

    employee.employeeId = nextEmployeeId;

    await employee.save();
    res.status(200).json({ message: 'Employee approved', employee });
  } catch (err) {
    res.status(500).json({ message: 'Error approving employee', error: err });
  }
};
      // Function to get all employees approved by HR
      const getAllApprovedEmployees = async (req, res) => {
          try {
            const approvedEmployees = await Employee.find({ isHRApproved: true });
            res.status(200).json({
              data: approvedEmployees,
              msg: "Approved Employees"
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
          }
        };

module.exports = {
  submitEmployeeForm,
  getAllNewApproval,
  approveEmployee,
  getAllApprovedEmployees
 
};
