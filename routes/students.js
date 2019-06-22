const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/',  async (req, res, next) =>{
  try{
    const allStudents = await Student.findAll();
    res.status(200).json(allStudents)
  } catch(err){
    next(err)
  }
})

router.get('/:id' , async (req, res, next) =>{
  try{
    const id = req.params.id;
    const studentById = await Student.findById(id)
    if(studentById === null){
      next();
    } else
    res.status(200).send(studentById);
  } catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) =>{
   await Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  const newStudent = await Student.findOne({
    where:{
      email: req.body.email
    }
  })
  res.status(201).json(newStudent)
})

router.put('/:id', async (req, res, next) =>{
  try{
  const updateStudent = await Student.findById(req.params.id)
  await Student.update({firstName: req.body.firstName},
    {
    where: {
      id: req.params.id
    }
  })
  const updatedStudent = await Student.findById(req.params.id)
  res.status(200).json(updatedStudent)
} catch(err){
  next(err)
}
})

router.delete('/:id', async(req, res, next) =>{
  const inputId = req.params.id;
  await Student.destroy({
    where:{
      id: inputId
    }
  })
  const destroyedStudent = await Student.findById(inputId)
  res.status(204).json(destroyedStudent)
})



module.exports = router;


// , lastName: updateStudent.lastName, email: updateStudent.email
