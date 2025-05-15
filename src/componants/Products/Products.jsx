import axios from 'axios'
import React, {createContext, useContext, useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import {cartContext} from '../../context/cartContext'
import { toast } from 'react-toastify';




export default function Products() {
let {addToCart,setCartNumber}= useContext(cartContext)
 const [productList,setProduct] = useState([])
async function getProducts(){

   let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products');
   
   console.log(data.data);
   setProduct(data.data)
}
async function addToMyCart(id){

  let {data}= await addToCart(id)
  if(data.status == 'success'){
    toast.success(data.message);
    setCartNumber(data.numOfCartItems)
    

  }
  console.log(data)
}

useEffect(()=>{

    getProducts()
},[])
    return (
        <div className='row'>
         {

       productList.map((product)=>{
        
        return <div className="col-md-3" key={product._id}>
            <div className="product p-5">
                <img src={product.imageCover} className='w-100' alt={product.title}/>
              <p className='text-primary'>{product.category.name}</p>
              <h6>{product.title}</h6>
              <div className='d-flex justify-content-between'>

             <p>{product.price} EG</p>
             <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
              </div>
           


              <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-primary text-light'>Add to cart</button>


            </div>


        </div>
       



       })



         }

        </div>
    )
}