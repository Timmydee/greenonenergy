

// 'use client'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'

// const fetchProducts = async () => {
//     const response = await axios.get("/api/vendor/product", { withCredentials: true });
//     return response.data;
// }

// const VendorDashboard = () => {
//     const { data: products, isLoading, error } = useQuery({
//         queryKey: ["product"],
//         queryFn: fetchProducts
//     });

//     if (isLoading) return <p>Loading products...</p>
//     if (error) return <p>Error fetching products</p>

//     return (
//         <div>
//             <h2>Your Products</h2>
//             {products?.products?.length ? (
//                 products.products.map((product: any) => (
//                     <div key={product._id}>
//                         <h3>{product.name}</h3>
//                         <p>{product.price}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No products available.</p>
//             )}
//         </div>
//     )
// }

// export default VendorDashboard



import ProductList from '@/components/Product/ProductList'
import React from 'react'

const Product = () => {
  return (
    <div>
        <ProductList />
    </div>
  )
}

export default Product