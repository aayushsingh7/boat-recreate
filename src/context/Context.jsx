import {React, useState} from 'react'
import { useContext,createContext } from 'react'

export const AppContext = createContext()

const AppFunction = ({children}) => {

   const [showSideNavbar,setShowSideNavbar] = useState(false)
   const [openSearchPage,setOpenSearchPage] = useState(false)
   const [showCart,setShowCart] = useState(false)
   const [cartItems,setCartItems] = useState([])


   const addToCart = (newProduct)=> {
      setCartItems((oldItems)=> {
        return [newProduct,...oldItems]
      })
      localStorage.setItem("cart",cartItems)
   }

   const removeFromCart = (productId)=> {
    setCartItems((oldItems)=> {
        return oldItems.filter((product)=> {
            product.id !== productId
        })
    })
    localStorage.setItem("cart",cartItems)
   }






    return (
        <AppContext.Provider value={{
             showCart,cartItems,showSideNavbar,openSearchPage,setShowSideNavbar,setOpenSearchPage,setShowCart,addToCart,removeFromCart
        }}>
{children}
        </AppContext.Provider>
    )

}

export default AppFunction