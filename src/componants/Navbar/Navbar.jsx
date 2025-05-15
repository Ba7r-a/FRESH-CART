import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/TokenContext'
import { cartContext } from '../../context/cartContext';

export default function Navbar() {
let {userToken,setToken}= useContext(userContext);
let {cartNumber,getCart,setCartNumber}= useContext(cartContext)



let navigate=useNavigate()

  function logout(){

    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/signin')
  }


  useEffect(()=>{
  (async ()=>{
  
   let {data}= await getCart();
   setCartNumber(data.numOfCartItems)
  })()
  
  
  },[])

    return (
        <>
       <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
  <a className="navbar-brand" href="#"><i className="fa-solid fa-cart-shopping"></i> <span className='fw-bold'>FreshCart</span></a>
  {
    userToken !==null?
    <ul className="nav nav-pills">
    <li className="nav-item">
      <Link className="nav-link" to="home">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="product">Products</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="category">Categaries</Link>
    </li>
  
    
    
    
  </ul>
  :''

  }
  
  <ul className="nav nav-pills">
    {
     userToken==null?
<>
     <li className="nav-item">
     <Link className="nav-link" to="signup">Register</Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to="signin">login</Link>
   </li>
</>
:''
    }
  
    {userToken !==null?
     <>
     <li className="nav-item">
      <Link className="nav-link" to="cart">
      <i className='fa-solid fa-shopping-cart text-primary'></i>
      <span className='badge bg-primary text-light'>{cartNumber}</span>
      </Link>
    </li>
      <li onClick={()=>(logout())} className="nav-item">
      <Link className="nav-link">Logout</Link>
    </li>
     </>:
     ''
  
  
  }
   
    
    
  </ul>
</nav>

        </>
    )
}