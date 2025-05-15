import axios from "axios";
import { createContext, useState } from "react";

export let cartContext= createContext()

 export default function CartContextProvider(props){

    const[cartNumber,setCartNumber]= useState(0)
let BaseUrl=`https://ecommerce.routemisr.com`;
let header ={
    token:localStorage.getItem('userToken')
}



    function addToCart(id){

        return axios.post(`${BaseUrl}/api/v1/cart`,
            {
         productId:id
            },
            {

                headers:header
            }
        )
    }

    function getCart(){

        return axios.get(`${BaseUrl}/api/v1/cart`,
         
            {

                headers:header
            }
        )
    }


    function ubdateCart(id,count){

        return axios.put(`${BaseUrl}/api/v1/cart/${id}`,
            {
         count:count
            },
            {

                headers:header
            }
        )
    }

    function deleteCart(id){

        return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,
          
            {

                headers:header
            }
        )
    }


  function checkOutPayment(id,formData){
       return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,

    {
        shippingAddress:formData
    },
    {
    headers:header
    }



       )



     }



return <cartContext.Provider value={{addToCart, setCartNumber,cartNumber,getCart,deleteCart,ubdateCart,checkOutPayment}}>


  {props.children}
 </cartContext.Provider>
 }  