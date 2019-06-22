const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', async (req, res, next) =>{
  try{
    const allTests = await Test.findAll();
    res.status(200).json(allTests);
  } catch(err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) =>{
  try{
    const singleTest = await Test.findById(req.params.id);
    res.status(200).json(singleTest)
  } catch(err){
    next(err)
  }
})

router.post('/student/:studentId', async (req, res, send) =>{
  const newTest = await Test.create({
    subject: req.body.subject,
    grade: req.body.grade,
    studentId: req.params.studentId
  })
  res.status(201).json(newTest);
})

router.delete('/:id', async (req, res, next) =>{
  const inputId = req.params.id;
  const destroyedTest = await Test.destroy({
    where:{
      id: inputId
    }
  })
  res.status(204).json(destroyedTest)
})


module.exports = router;
