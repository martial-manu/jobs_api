require('dotenv').config();
require('express-async-errors')

// async errors 

const express = require('express');
const app = express();


const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json())


app.get('/'  , (req , res)=>{
    res.send('<h1>Store API</h1><a href = "/api/v1/products">Products Route</a>');
})

app.use('/api/v1/products' , productsRouter);

// products route
app.use(notFoundMiddleware); // agar next call krte h upar vaale to ye kyu ni hit krra 
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI ).then(()=>{
            console.log('database connected')
        });

        app.listen(PORT , ()=>{console.log("server is running " , PORT)});
    }
    catch(err){
        console.log(err);
    }
}

start();
