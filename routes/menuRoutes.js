const express = require('express')

const router = express.Router();
const menuItem = require('./../model/menu')

router.get('/', async(req,res)=>{

    try{

        const data = await menuItem.find();
        console.log('Data saved');
        res.status(200).json(data);
    }
    catch(error){
        console.log("error")
    }
})


router.post('/', async(req, res)=>{

    try{

        const data = req.body
        const menuData = new menuItem(data)
        const response = await  menuData.save()
        console.log("data saved")
        res.status(200).json(response);
       
    }
    catch(error){
        console.log("error ")
        res.status(500).json({error : "Inter server error"})
    }
})

module.exports = router;