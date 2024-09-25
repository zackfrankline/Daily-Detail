import { createContext, useEffect, useMemo, useState } from "react";
import { fetchDatafromCollection } from "../services/fireabse.utils";

export const ProductContext = createContext({
    products:null,
    setProducts:()=>null
})

export const ProductProvider = ({children}) =>{
    const [products,setProduct] = useState(null);
    
    useEffect(()=>{
        const fetchProductsData = async () => {
            const response = await fetchDatafromCollection("Service Tiers");
            setProduct(response)
        }
        fetchProductsData();
    },[])
    
    const value= useMemo(()=>({products}),[products])

    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )
}