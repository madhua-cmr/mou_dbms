import  { useState } from 'react'
import { AppContext } from './AppContext'

const AppContextProvider = ({children}) => {
    const [authScreen,setAuthScreen]=useState("login");
  const value={authScreen,setAuthScreen}
  return (
 <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
