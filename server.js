const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./model/Person')

// const bodyParse = require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', (req,res)=>{
res.send("Hello");
})

// app.get('/book', (req,res)=>{
//     res.send("YOU ARE DOING GREAT WORK")
// })

// app.listen(3000,()=>{
//     console.log("Listening on port 3000 ")
// });



app.post('/person', async (req,res)=>{
    try{

        const data = req.body
        const newPerson = new Person(data);

        const response = await newPerson.save();

        res.status(200).json(response)

    }
    catch(error){
        console.log("error occured")
        res.status(500).json({ error: error.message });
    }
})


app.get('/person', async(req,res)=>{
try{
// const data = body.data
// const person = new Person(data);

const data = await Person.find();
console.log('data fetched')
res.status(200).json(response);

}
catch(error){
    console.log("Error is occured")
    res.status(500).json(response)
}
})