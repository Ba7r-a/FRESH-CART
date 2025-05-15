import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Products from '../Products/Products';


export default function Category() {
  const [category,setCategory]=  useState([])
  async function getCategory(){
  let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  setCategory(data.data)
    }
    useEffect(()=>{
        
        getCategory()

    },[])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };
    return (
        <div>    <Slider {...settings}>

        {

            category.map((category)=>{
            return <>
                        <img src={category.image} className='w-100' height={200}/>
                    <p>{category.name}</p>
            
            </>
            
            })
        }
        </Slider>


        <Products/>
</div>

    )
}