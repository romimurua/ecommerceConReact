import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import MyNavbar from './components/MyNavbar'
import LoadingScreen from './components/LoadingScreen'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getProductsThunk } from './store/slices/products.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRouters'

function App() {
  
  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    
    <div> 
    <HashRouter>
      <MyNavbar />
      {isLoading && <LoadingScreen />}
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
         
        </Routes>
      </Container>
    </HashRouter>
  
  <footer className="footer"> Proyecto Final del Módulo de REACT - Academlo </footer>
  </div>
  )
}



export default App
