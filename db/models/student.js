'use strict';

const Sequelize = require('sequelize');
const db = require('../db');



const Student = db.define('Student', {
  firstName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    validate:{
      isEmail: true,
    },
    allowNull: false
  },
});

Student.beforeCreate( student =>{
  const firstNameFirstLetter = student.firstName[0].toUpperCase();
  if(student.firstName[0] !== firstNameFirstLetter){
    student.firstName = firstNameFirstLetter + student.firstName.slice(1)
  }
  const lastNameFirstLetter = student.lastName[0].toUpperCase();
  if(student.lastName[0] !== lastNameFirstLetter){
    student.lastName = lastNameFirstLetter + student.lastName.slice(1)
  }
})





module.exports = Student;
