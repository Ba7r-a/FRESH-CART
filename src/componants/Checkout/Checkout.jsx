import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useState } from 'react';
import axios from 'axios';
import { cartContext } from '../../context/cartContext';

export default function Checkout() {
  let{checkOutPayment}= useContext(cartContext)

    const [isLoading,setLoading]= useState(false)
    const [errMsg,setErr]=useState(null)

    let id='65d3a588fd7fcd003463a4a6'
 
 async function payment(val){

 let data= await checkOutPayment(id,val)
    console.log(val)
    if(data.data.status=='success'){
       window.location=data.data.session.url
    }

 }
   let formik= useFormik({
    initialValues:{
       details:'',
       city:'',
       phone:'',
       
    
    },
    onSubmit:payment
   })
 
     return (
         <div  className='my-5'>
             <h1 className="text-primary text-center">Payment Form</h1>
           <form onSubmit={formik.handleSubmit}>
             <div className="row">
                <div className="col-md-8 m-auto  bg-light shadow p-4">
                   <div className="row gy-4">
 
               
              <div className="col-md-12">
                 <label htmlFor='userEmail'>details</label>
                 <input type='text' id='userEmail' name='details' value={formik.values.details} onChange={formik.handleChange} className='form-control'/>
 
              </div>
              
              <div className="col-md-12">
                 <label htmlFor='urCity'>city</label>
                 <input type='text' id='urCity' name='city' value={formik.values.city} onChange={formik.handleChange} className='form-control'/>
 
              </div>
              <div className="col-md-12">
                 <label htmlFor='urPhone'>phone</label>
                 <input type='tel' id='urPhone' name='phone' value={formik.values.phone} onChange={formik.handleChange} className='form-control'/>
 
              </div>
              
           
              <div className="col-md-12 text-end my-2">
                 <button  type='submit' className='btn bg-primary text-light'>Pay</button>
               
                 
              </div>
 
                   </div>
 
   
                </div>
             
             </div>
           </form>
 
 
 
         </div>
     )
}