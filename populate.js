require('dotenv').config();   // .env for MONGO_URI connection string 


const connectDB = require('./db/connect');    // function for connecting mongodb server
const Product = require('./models/product');  // mongo db model for product
 
const jsonProducts = require('./products.json'); // json file for raw data

const start = async()=>{
    try{
       await connectDB(process.env.MONGO_URI);
       await Product.deleteMany();
       await Product.create(jsonProducts);
       console.log('success');
       process.exit(0);
    } catch(err){
         console.log(err);
         process.exit(1);
    }
}

start();