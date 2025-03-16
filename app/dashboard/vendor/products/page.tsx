// 'use client'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import React from 'react'

// const fetchProducts = async() => {
//     return await axios.get('/api/vendor/product')
// }
// const Products = () => {

//     const {data, error, isLoading} = useQuery({queryKey: ["products"], queryFn: fetchProducts})

//     if (isLoading) return <p>Loading</p>
//     if(error) return <p> Error: {error.message}</p>
//     console.log('your', data)
//   return (
//     <div>
//         <Card>
//             <CardHeader>
//                 <CardTitle>Products Page</CardTitle>
//             </CardHeader>
//             <CardContent>

//             </CardContent>
//         </Card>
//     </div>
//   )
// }

// export default Products

'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchProducts = async () => {
    const response = await axios.get("/api/vendor/product", { withCredentials: true });
    return response.data;
}

const VendorDashboard = () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["product"],
        queryFn: fetchProducts
    });

    if (isLoading) return <p>Loading products...</p>
    if (error) return <p>Error fetching products</p>

    return (
        <div>
            <h2>Your Products</h2>
            {products?.products?.length ? (
                products.products.map((product: any) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    )
}

export default VendorDashboard
