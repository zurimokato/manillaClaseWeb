import Manilla from '../components/Manilla';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistroUsuario from '../components/RegistroUsuario';

function Rutas() {
    return <Routes>
        <Route path='/' element={<RegistroUsuario />} />
        <Route path='home' element={<Home />} />
        <Route path='singIn' element={<RegistroUsuario />} />
        <Route path='manilla' element={<Manilla />} />
        <Route path='pago' element={<Pago />} />
    </Routes>
}

export default Rutas
