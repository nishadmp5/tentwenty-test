import React from 'react'
import ProductsTitle from '../components/ProductsTitle'
import ProductsSlider from '../components/ProductsSlider'

const Products = () => {
  return (
    <div className='bg-white w-screen h-auto overflow-hidden'>
        <ProductsTitle/>
        <ProductsSlider/>
    </div>
  )
}

export default Products