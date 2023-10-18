const express = require('express');
const router = express.Router();
const moment = require('moment');
const employees = require('../../Employees');
//retrieve all employees
router.get('/', (req, res) => {
    res.json(employees);
});

//retrieve a single employee
router.get('/:name', (req, res) => {
    const checkName = employees.some(employee => 
        employee.name === req.params.name);
    if(checkName) {
        return res.json(employees.filter(employee => 
            employee.name === req.params.name));
    } else {
        //400 status bad request
        res.status(400).json({msg: `No employee with the name ${req.params.name}`});
    }
});

//create employee
router.post('/', (req, res) => {
    const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        age: Math.round(Math.random() * (100 - 18) + 18),
        added: `${moment().format()}`
    }
    //error handling
    if(!newEmployee.name || !newEmployee.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    //push new employee to employees array
    employees.push(newEmployee);
    res.json(employees);
});

//update employee list
router.put('/:name', (req, res) => {
    const checkName = employees.some(employee => 
        employee.name === req.params.name);
    if(checkName) {
        const updateEmployee = req.body;
            employees.forEach(employee => {
                if(employee.name === req.params.name) {
                    employee.name = updateEmployee.name ? updateEmployee.name : employee.name;
                    employee.email = updateEmployee.email ? updateEmployee.email : employee.email;
                    employee.age = updateEmployee.age ? updateEmployee.age : employee.age;
                }
            })
        return res.json(employees);
        } else {
        //400 status bad request
        res.status(400).json({msg: `No employee with the name ${req.params.name}`});
    }
});

//delete employee
router.delete('/:name', (req, res) => {
    const checkName = employees.some(employee => 
        employee.name === req.params.name);

    if(checkName) {
        res.json({
            msg: `Employee deleted`,
            employees: employees.filter(employee => employee.name !== req.params.name)
        });
            
    } else {
        //400 status bad request
        res.status(400).json({msg: `No employee with the name ${req.params.name}`});
    }
});
module.exports = router;