"use client"

import React, { useRef, useEffect, useState } from 'react'

import axios from 'axios'

import { useRouter, useParams } from 'next/navigation'

function ProductForm() {
    const [product, setProduct] = useState({ name: "", description: "", price: 0 })
    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter()

    //? Esto es para los parametros que provienen del Edit
    const params = useParams()
    //? Asignar los valores al form
    useEffect(() => {
        if (params.id) {
            axios.get('/api/products/' + params.id)
                .then(res => {
                    setProduct({
                        name: res.data.name,
                        price: res.data.price,
                        description: res.data.description,
                    })
                })
        }
    }, [])

    const form = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        //? Si no existe un param id, se esta creando si viene un id, es porque se va a editar.
        if (!params.id) {
            const res = await axios.post('api/products', product)
        } else {
            const res = await axios.put('/api/products/' + params.id, product)
        }

        form.current.reset();
        router.push('/products')
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} ref={form}
            className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>

            <label htmlFor="name"
                className='block text-gray-700 text-sm font-bold my-2'>Product Name</label>
            <input type="text" name='name' placeholder="name" onChange={handleChange} value={product.name} //? asginamos los valores
                className='shadow appearance-none border rounded w-full py-2 px-3' />

            <label htmlFor="price"
                className='block text-gray-700 text-sm font-bold my-2'>Product Price:</label>
            <input type="text" name='price' placeholder="00.00" onChange={handleChange} value={product.price}
                className='shadow appearance-none border rounded w-full py-2 px-3' />

            <label htmlFor="name"
                className='block text-gray-700 text-sm font-bold my-2'>Product Description: </label>
            <textarea rows={3} type="text" name='description' placeholder="description" onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3' value={product.description} />

            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'
            >
                {params.id ? "Update Product" : "Save Product"}
            </button>

        </form>
    )
}

export default ProductForm