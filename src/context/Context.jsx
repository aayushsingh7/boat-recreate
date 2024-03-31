import {React, useState} from 'react'
import { useContext,createContext } from 'react'

export const AppContext = createContext()

const AppFunction = ({children}) => {

   const [showSideNavbar,setShowSideNavbar] = useState(false)
   const [openSearchPage,setOpenSearchPage] = useState(false)

    return (
        <AppContext.Provider value={{
             showSideNavbar,openSearchPage,setShowSideNavbar,setOpenSearchPage
        }}>
{children}
        </AppContext.Provider>
    )

}

export default AppFunction