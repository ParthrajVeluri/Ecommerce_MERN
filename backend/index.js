const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/models')

const app = express();

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Admin:Welcome123@ecommercewebsite.ztbkqid.mongodb.net/MernDB')
} 

connectDB()

async function insert(){
    await User.create({
        name:"Parthraj",
        email:"Veluri"
    });
}

app.get('/', async(req, res) => {
    await insert()
})

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);



