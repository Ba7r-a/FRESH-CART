import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { userContext } from '../../context/TokenContext';



export default function Signin() {
  let {userToken,setToken}=useContext(userContext)

    const [isLoading,setLoading]= useState(false)
    const [errMsg,setErr]=useState(null)
 
   let navigate= useNavigate()
 
 let validationSchema= Yup.object({
    email:Yup.string().required('email is required').email('enter availd email'),
    password:Yup.string().required('this password is required').matches(/^[A-Z][a-z0-9]{6,8}$/),
 })
 
 
 
 
 
 
 async function signIn(val){
    setLoading(true)
    //console.log(val)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
    console.log(err.response.data.message)
    setErr(err.response.data.message)
    setLoading(false)
 
  })
  console.log(data)
  if(data.message=='success'){
     navigate('/home')
     localStorage.setItem('userToken', data.token)
     setToken(data.token)
     setLoading(false) 
     
  }
 }
   let formik= useFormik({
    initialValues:{
       
       email:'',
       password:'',
       
    
    },
    validationSchema
    ,
    onSubmit:signIn
   })
 
     return (
         <div  className='my-5'>
             <h1 className="text-primary text-center">Login Form</h1>
           <form onSubmit={formik.handleSubmit}>
             <div className="row">
                <div className="col-md-8 m-auto  bg-light shadow p-4">
                   <div className="row gy-4">
 
               
              <div className="col-md-12">
                 <label htmlFor='userEmail'>E-mail</label>
                 <input type='email' id='userEmail' name='email' value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
                 <p className='text-danger'>{formik.errors.email}</p>
 
              </div>
              
              <div className="col-md-12">
                 <label htmlFor='userPassword'>Password</label>
                 <input type='password' id='userPassword' name='password' value={formik.values.password} onChange={formik.handleChange} className='form-control'/>
                 <p className='text-danger'>{formik.errors.password}</p>
 
              </div>
              
              {errMsg !== null?
              <p className='text-danger'>{errMsg}</p>: ''
             }
              <div className="col-md-12 text-end my-2">
                 <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-primary text-light'>Login</button>
                 {isLoading?
                    <span>
                    <i className='fa-solid mx-2 fa-spinner fa-spin'></i>
                  </span>
                   :
 
                   ''
                
                
                }
                 
              </div>
              <p className='text-muted'>I have account <Link to='/signup' className='text-primary fw-bold'>Register</Link></p>
 
                   </div>
 
   
                </div>
             
             </div>
           </form>
 
 
 
         </div>
     )

}