import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';









export default function Signup() {
   const [isLoading,setLoading]= useState(false)
   const [errMsg,setErr]=useState(null)

  let navigate= useNavigate()

let validationSchema= Yup.object({
   name:Yup.string().min(3,'minlength is 3').max(15,'maxlenght is 15').required('This name is required'),
   email:Yup.string().required('email is required').email('enter availd email'),
   phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone is required'),
   password:Yup.string().required('this password is required').matches(/^[A-Z][a-z0-9]{6,8}$/),
   rePassword:Yup.string().required('this confirm password is required').oneOf([Yup.ref('password')]),
})






async function signUp(val){
   setLoading(true)
   //console.log(val)
 let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
   console.log(err.response.data.message)
   setErr(err.response.data.message)
   setLoading(false)

 })
 console.log(data)
 if(data.message=='success'){
    navigate('/signin')
    setLoading(false)

 }
}
  let formik= useFormik({
   initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
   },
   validationSchema
   ,
   onSubmit:signUp
  })

    return (
        <div  className='my-5'>
            <h1 className="text-primary text-center">Register Form</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
               <div className="col-md-8 m-auto  bg-light shadow p-4">
                  <div className="row gy-4">

                  <div className="col-md-12">
                <label htmlFor='userName'>name</label>
                <input type='text' id='userName' name='name' value={formik.values.name} onChange={formik.handleChange} className='form-control'/>
                <p className='text-danger'>{formik.errors.name}</p>
             </div>
             <div className="col-md-12">
                <label htmlFor='userEmail'>E-mail</label>
                <input type='email' id='userEmail' name='email' value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
                <p className='text-danger'>{formik.errors.email}</p>

             </div>
             <div className="col-md-12">
                <label htmlFor='userPhone'>Phone</label>
                <input type='tel' id='userPhone' name='phone' value={formik.values.phone} onChange={formik.handleChange} className='form-control'/>
                <p className='text-danger'>{formik.errors.phone}</p>

             </div>
             <div className="col-md-12">
                <label htmlFor='userPassword'>Password</label>
                <input type='password' id='userPassword' name='password' value={formik.values.password} onChange={formik.handleChange} className='form-control'/>
                <p className='text-danger'>{formik.errors.password}</p>

             </div>
             <div className="col-md-12">
                <label htmlFor='userConfirm'>re-password</label>
                <input type='password' id='userConfirm' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} className='form-control'/>
                <p className='text-danger'>{formik.errors.rePassword}</p>

             </div>
             {errMsg !== null?
             <p className='text-danger'>{errMsg}</p>: ''
            }
             <div className="col-md-12 text-end my-2">
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-primary text-light'>Register </button>
                {isLoading?
                   <span>
                   <i className='fa-solid mx-2 fa-spinner fa-spin'></i>
                 </span>
                  :

                  ''
               
               
               }
                
             </div>
             <p className='text-muted'>I have account <Link to='/signin' className='text-primary fw-bold'>Login</Link></p>

                  </div>

  
               </div>
            
            </div>
          </form>



        </div>
    )
}