import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './componants/Layout/Layout';
import Home from './componants/Home/Home';
import Products from './componants/Products/Products';
import Category from './componants/Category/Category';
import Signin from './componants/Signin/Signin';
import Signup from './componants/Signup/Signup';
import Notfound from './componants/Notfound/Notfound';

import Cart from './componants/Cart/Cart';
import UserContextProvider from './context/TokenContext';
import ProtectedRour from './componants/protectedRour/protectedRour';
import CartContextProvider from './context/cartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './componants/Checkout/Checkout';

const router =createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'',element: <ProtectedRour><Home/></ProtectedRour> },
    {path: 'home',element:<ProtectedRour><Home/></ProtectedRour>},
    {path: 'product',element:<ProtectedRour><Products/></ProtectedRour>},
    {path: 'category',element:<ProtectedRour><Category/></ProtectedRour>},
    {path: 'checkout',element:<ProtectedRour><Checkout/></ProtectedRour>},

    {path: 'cart',element:<ProtectedRour><Cart/></ProtectedRour>},

    {path: 'signin',element:<Signin/>},
    {path: 'signup',element:<Signup/>},
    {path: '*',element:<Notfound/>},
  ]}
])
function App() {
  return (
    <CartContextProvider>
 <UserContextProvider>
    <RouterProvider router={router}></RouterProvider>
    < ToastContainer theme='colored'/>

    </UserContextProvider>

    </CartContextProvider>
   
  );
}

export default App;
