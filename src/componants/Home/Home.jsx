import React, { useContext } from 'react'
import Products from "../Products/Products"
import Category from '../Category/Category'
export default function Home() {

   
    return (
        <div>
            <h2>Category</h2>
            <Category/>
            <h2>Products</h2>
            <Products/>
        </div>
    )
}