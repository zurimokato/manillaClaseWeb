import Manilla from '../components/Manilla';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistroUsuario from '../components/RegistroUsuario';

function Rutas() {
    return (
        <Router>
            <Routes>
                <Route path="/manilla" component={Manilla} />
                <Route path="/registro" component={RegistroUsuario} />
            </Routes>
        </Router>
    );
}

export default Rutas
