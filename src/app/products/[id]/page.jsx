import React from 'react'
import axios from "axios"
import Buttons from './Buttons';

async function loadProduct(productId) {
    const { data } = await axios.get("http://localhost:3000/api/products/" + productId)
    return data;
}

async function ProductPage({ params }) {
    const product = await loadProduct(params.id)

    return (
        <section className='flex justify-center items-center p-4'>
            <div className='p-6 bg-white rounded-lg'>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>

                <Buttons productId={product.id}/>
            </div>
        </section>
    )
}

export default ProductPage