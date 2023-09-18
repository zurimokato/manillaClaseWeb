import Manilla from '../components/Manilla';
import { Route, Routes } from 'react-router-dom';
import RegistroUsuario from '../components/RegistroUsuario';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home'
import Pago from '../components/Pago'

function Rutas() {
    return <Routes>
        <Route path='/' element={<RegistroUsuario />} />
        <Route path='home' element={<Home />} />
        <Route path='singIn' element={<RegistroUsuario />} />
        <Route path='manilla' element={<Manilla />} />
        <Route path='pago' element={<Pago />} />
        <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
}

export default Rutas
