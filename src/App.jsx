import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import RegistroUsuario from './components/RegistroUsuario'
import Manilla from './components/Manilla'
import Pago from './components/Pago'

export default function App() {
  return <Routes>
    <Route path='/' element={<RegistroUsuario/>}/>
    <Route path='home' element={<Home/>}/>
    <Route path='singIn' element={<RegistroUsuario/>}/>
    <Route path='manilla' element={<Manilla/>}/>
    <Route path='pago' element={<Pago/>}/>

  </Routes>
    
}
