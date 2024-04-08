import { createContext, React, useEffect, useState } from 'react'

export const AppContext = createContext()

const AppFunction = ({children}) => {

   const [showSideNavbar,setShowSideNavbar] = useState(false)
   const [openSearchPage,setOpenSearchPage] = useState(false)
   const [showCart,setShowCart] = useState(false)
   const [cartItemsLength,setCartItemsLength] = useState([])
   const [cartItems,setCartItems] = useState([])
   const [showLogin,setShowLogin] = useState(false)
   const [showRegister,setShowRegister] = useState(false)
   const [user,setUser] = useState({})
   const [showProfile,setShowProfile] = useState(false)
   const [showFilters,setShowFilters] = useState(false)


   const addToCart = (newProduct)=> {
      setCartItemsLength([...cartItemsLength,newProduct.id])
      setCartItems((oldItems)=> {
    localStorage.setItem("cart",JSON.stringify([newProduct,...oldItems]))
        return [newProduct,...oldItems]
      })
   }


   const removeFromCart = (productId)=> {
    setCartItemsLength(cartItemsLength.filter((item)=> item !== productId))
    
    setCartItems((old)=> {
        return old.filter((item)=> item.id !== productId)
    })
    
    localStorage.setItem("cart",JSON.stringify(cartItems.filter((product)=> product.id !== productId)))
   }

   useEffect(()=> {
    // window.alert("rendered")
    const cartData = JSON.parse( localStorage.getItem("cart"))
    getUserDetails()
    if(!cartData){
        setCartItems([])
        setCartItemsLength([])
        return;
    }
    const cartLength  = cartData?.map((data)=> data.id)
    setCartItems(cartData)
    setCartItemsLength(cartLength)
   },[])


   const getUserDetails = ()=> {
    const user = JSON.parse(localStorage.getItem("user_details"))
    console.log("userId",user)
    if(!user) return setUser({id:"default_user_id"})
    setUser(user)
   }




    return (
        <AppContext.Provider value={{
             showFilters,showProfile,user,showLogin,showRegister,cartItemsLength,showCart,cartItems,showSideNavbar,openSearchPage,setShowSideNavbar,setOpenSearchPage,setShowCart,addToCart,removeFromCart,setShowLogin,setShowRegister,getUserDetails,setShowProfile,setShowFilters
        }}>
{children}
        </AppContext.Provider>
    )

}

export default AppFunction