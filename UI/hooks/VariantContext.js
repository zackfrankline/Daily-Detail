import { createContext, useEffect, useState } from "react";

export const VariantContext = createContext({
    currentSelectedVariant:null,
    setCurrentSelectedVariant:()=>null,
}) 

export const VariantProvider = ({children}) => {
    const [currentSelectedVariant,setCurrentSelectedVariant] = useState(null)


    const value = {currentSelectedVariant,setCurrentSelectedVariant};

    return(
        <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
    )
}