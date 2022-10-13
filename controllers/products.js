
const Product = require('../models/product');

const getAllProductsStatic = async (req , res)=>{
    const search = 'a';
    const products = await Product.find({ 
        name :  {$regex : search , $options : 'i'}
     }); // saare products lelp
    
    res.status(200).json({msg : 'products testing route', nbHits : products.length , products });  
} 

const getAllProducts  = async(req , res)=>{

    const {featured , company , name , sort , fields } = req.query;
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true'?true : false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = {$regex : search , $options : 'i'} ;
    }

    let result = Product.find(queryObject); // I got that
    console.log(sort);
    if(sort){
       const sortList = sort.split(',').join(' ');
       result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;

    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({products , nbHits : products.length});
}

module.exports = {getAllProducts , getAllProductsStatic};