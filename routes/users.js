var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");

let pathToPeopleFile = path.resolve(__dirname,'../data/people.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(pathToPeopleFile,(err,data)=>{
    if(err){
      console.error(err);
      res.send(err);
    }
    let people = JSON.parse(data);
    console.log(people);
    res.json(people);
  });
});

router.get('/try_catch/blocking',(req,res,next)=> {
  try{
    let data = fs.readFileSync(pathToPeopleFile);
    let people = JSON.parse(data);
    console.log(people);
    res.send(people);
  }catch(err){
    console.log(err);
    res.send(err);
  }
})

router.get('/user/:first_name',(req,res)=>{
  try{
    let data = fs.readFileSync(pathToPeopleFile);
    let people = JSON.parse(data);
    people.people.forEach(element => {
      if(element.first_name === req.params.first_name){
        res.send(element);
      }
    });
    res.send({message: "Person not found"})
  }catch(err){
    console.error(err);
    res.send(err);
  }
});

router.get('/country/:country',(req,res)=>{
  try{
    let data = fs.readFileSync(pathToPeopleFile);
    let people = JSON.parse(data);
    people.people.forEach(element => {
      if(element.country === req.params.country){
        res.send(element);
      }
    });
    res.send({message: "Country not found"})
  }catch(err){
    console.error(err);
    res.send(err);
  }
});

router.post('user/',(req,res)=>{
  let record = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    country: req.body.country,
    modified: req.body.modified,
    vip: true
  }

  try{
    let data = fs.readFileSync(pathToPeopleFile);
    let people = JSON.parse(data);
    people.people.push(record);
    fs.writeFile(pathToPeopleFile,JSON.stringify(people));
  }catch(err){
    console.error(err);
    res.send({message: "Error encountered when processing the file", error: err})
  }
})

module.exports = router;
