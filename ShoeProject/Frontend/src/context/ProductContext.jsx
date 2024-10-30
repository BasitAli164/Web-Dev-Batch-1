import { createContext,useContext,useState } from "react";
import { dummyProducts } from "../../public/Data";
const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState(dummyProducts||[]);
  return (
    <ProductContext.Provider value={{products}}>
        
        {children} </ProductContext.Provider>)
        }
export const useProduct = () =>  useContext(ProductContext);