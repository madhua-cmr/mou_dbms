
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddMouPage from './pages/AddMouPage'
import ListsMou from './pages/ListsMou'
import EditMouPage from './pages/EditMouPage'
import ViewMouPage from './pages/ViewMouPage'
import AuthPage from './pages/AuthPage'
import Header from './components/Header'
import Footer from './components/Footer'
import FilterModal from './components/FilterModal'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import AppContextProvider from './AppContext/AppContextProvider'
function App() {
 
  return (
    <>
     <div className='bg-slate-100'>
      <AppContextProvider>
      <ToastContainer/>
      <RecoilRoot>
<Routes>
 
<Route path="/" element={<><Header/><HomePage/><Footer/></>}/>
<Route path="/auth" element={<AuthPage/>}/>
<Route path="/filter" element={<FilterModal/>}/>
<Route path="/add" element={<><Header/><AddMouPage/><Footer/></>}/>
<Route path="/list" element={<><Header/><ListsMou/><Footer/></>}/>
<Route path="/edit" element={<><Header/><EditMouPage/><Footer/></>}/>
<Route path="/view"element={<><Header/><ViewMouPage/><Footer/></>}/>


</Routes>
</RecoilRoot>
</AppContextProvider>
</div>
    </>
  )
}

export default App
