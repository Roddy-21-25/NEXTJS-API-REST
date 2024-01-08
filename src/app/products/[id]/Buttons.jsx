"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

function Buttons({ productId }) {
    const router = useRouter()
    return (
        <div className='flex gap-x-2 p-2 justify-end'>
            <button onClick={async () => {
                if (confirm("are you sure you want to delete this product?")) {
                    const res = await axios.delete('/api/products/' + productId)
                    if (res.status === 204) {
                        router.push('/products')
                        router.refresh()
                    }
                }
            }} className='text-white font-bold bg-red-500 hover:bg-red-700 py-2 px-3 rounded'>Delete</button>
            <button onClick={() => {
                router.push('/products/edit/' + productId)
            }} className='text-white font-bold bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded'>Edit</button>
        </div>
    )
}

export default Buttons