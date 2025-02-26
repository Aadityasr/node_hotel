const express = require('express')

const router = express.Router();
const Person = require('./../model/Person');
const { route } = require('./personRoutes');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();

        console.log("data saved")
        res.status(200).json(response)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" })

    }

})

router.get('/', async (req, res) => {

    try {

        const data = await Person.find();
        console.log('Data saved');
        res.status(200).json(data);
    }
    catch (error) {
        console.log("error")
    }
})


router.get('/:type', async (req, res) => {
    try {
        const type = req.params.type;

        if (type === 'chef' || type === 'manager' || type === 'waiter') {
            const people = await Person.find({ work: type });  // ✅ Use a different variable name
            console.log('Response fetched:', people);

            return res.status(200).json(people);  // ✅ Correct response handling
        }

        return res.status(404).json({ error: "Invalid work type" });  // ✅ Return for invalid type
    } catch (error) {
        console.error("Error in GET /person/:type:", error);  // ✅ Logs actual error
        return res.status(500).json({ error: error.message });  // ✅ Sends readable error
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatePerson = req.body

        const response = await Person.findByIdAndUpdate(personId,updatePerson,{
            new : true,
            runValidators : true
        })

        if(!response){
            return res.status(404).json({error: "Person not found"})
        }

        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId)


        if(!response){
            return res.status(404).json({error : "person not found"})
        }
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error})
    }
})

module.exports = router