import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


function Manilla() {
    const [material, setMaterial] = useState("");
    const [tipo, setTipo] = useState("");
    const [dije, setDije] = useState("");
    const [materialOption, setMaterialOption] = useState([]);
    const [dijeOption, setDijeOption] = useState([]);
    const [tiposOption, setTiposOption] = useState([]);
    const [manillas, setManillas] = useState([]);
    const [conversion, setConversion] = useState(1);
    const [moneda, setMoneda] = useState(1);
    const navigateTo = useNavigate();



    const handlepago = () => {
        navigateTo('/pago')

    }
    const [valorDolar, setValorDolar] = useState(1);

    const addCarrito = async e => {
        e.preventDefault();

        if (material === "" || dije === "" || tipo === "") {

            alert("Hay obciones no seleccionadas por favor seleccionar obciones mandatorias ");
            return;

        }

        const manillasRef = collection(db, "manillas");

        const q = query(
            manillasRef,
            where("material", "==", material),
            where("dije", "==", dije),
            where("tipo", "==", tipo)
        );

        const querySnapshot = await getDocs(q);
        const manis = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, cantidad: 1 }));
        agregarManilla(manis[0]);
        setMaterial("");
        setDije("");
        setTipo("");


    }

    const agregarManilla = (manilla) => {
        const man = manillas.find((m) => m.id == manilla.id);
        if (man) {
            man.cantidad++;
            setManillas([...manillas]);
        } else {
            setManillas((manillas) => [...manillas, manilla]);
        }
    }

    const calcularTotal = () => {
        return new Intl.NumberFormat().format(manillas.reduce((total, producto) => total + producto.valor * producto.cantidad * conversion, 0));
    }

    const cambiarCantidad = (e, item) => {
        item.cantidad = e.target.value;
        setManillas([...manillas]);
    }


    const eliminarDelCarrito = (productoId) => {
        const carritoActualizado = manillas.filter((p) => p.id !== productoId);
        setManillas(carritoActualizado);
    }
    const cambioMoneda = (value) => {
        console.log(value);
        setMoneda(value);
        if (value == 1) {
            setConversion(1);

        } else if (value == 2) {
            const apiUrl = 'http://apilayer.net/api/live?access_key=40da905655b8bfc5c44974226367c4ea&currencies=COP';

            // Crea una nueva instancia de XMLHttpRequest
            const xhr = new XMLHttpRequest();

            // Configura la solicitud
            xhr.open('GET', apiUrl, true);

            // Maneja la carga exitosa de datos
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const jsonResponse = JSON.parse(xhr.responseText);

                    // Aquí puedes trabajar con los datos recibidos de la API
                    console.log(jsonResponse.quotes.USDCOP.toFixed(2));
                    setValorDolar(jsonResponse.quotes.USDCOP.toFixed(2));
                } else {
                    console.error('Error en la solicitud a la API');
                }
            };

            // Maneja errores de red u otros errores
            xhr.onerror = function () {
                console.error('Error en la solicitud a la API');
            };

            // Envía la solicitud
            xhr.send();
            console.log(valorDolar)
            setConversion(valorDolar);
        }

    }

    useEffect(() => {

        const obtenerMateriales = async () => {
            try {
                const materialRef = await getDocs(collection(db, "material"));
                const data = materialRef.docs.map((doc) => doc.data().nombre);
                setMaterialOption(data);

                console.log(materialOption)

            } catch (error) {
                console.log(error);

            }
        }

        const obtenerDije = async () => {
            try {
                const dijeref = await getDocs(collection(db, "dijes"));
                const data = dijeref.docs.map((doc) => doc.data().nombre);
                setDijeOption(data);

                console.log(materialOption)

            } catch (error) {
                console.log(error);

            }
        }

        const obtenerTipo = async () => {
            try {
                const tiposRef = await getDocs(collection(db, "tipos"));
                const data = tiposRef.docs.map((doc) => doc.data().nombre);
                setTiposOption(data);

                console.log(materialOption)

            } catch (error) {
                console.log(error);

            }
        }
        obtenerMateriales();
        obtenerTipo();
        obtenerDije();

    }, [])

    return (
        <div className='container-fluid'>
            <h1 className='text-center'>Manillas S.A.</h1>
            <hr />
            <div className="row">
                <div className="col-4">
                    <h4 className="text-center"> Selecciona tu configuración para las Manillas </h4>
                    <form onSubmit={addCarrito}>
                        <div className="row">
                            <div className="col-3">
                                <p className="small text-muted mb-1 pb-1">Material</p>
                                <select name="select-material" id="material" className="form-select" value={material} onChange={(e) => setMaterial(e.target.value)}>
                                    <option value="">Seleccione un material</option>
                                    {
                                        materialOption.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))

                                    }

                                </select>
                            </div>
                            <div className="col-3">
                                <p className="small text-muted mb-1 pb-1">Dije</p>
                                <select name="select-dije" id="dije" className="form-select" value={dije} onChange={(e) => setDije(e.target.value)}>
                                    <option value="">Seleccione un dije</option>
                                    {
                                        dijeOption.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))

                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <p className="small text-muted mb-1 pb-1">Tipo</p>
                                <select name="select-tipo" id="tipo" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="">Seleccione un tipo</option>
                                    {
                                        tiposOption.map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))

                                    }
                                </select>
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className='btn btn-primary btn-block'>
                                    Agregar al carrito</button>
                            </div>
                        </div>

                    </form>



                </div>
                <div className="col-8">
                    <h4 className="text-center">Carrito de Manillas</h4>
                    {
                        manillas.map(item => (

                            <div className="card mb-2" key={item.id}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-1">
                                            {item.material == 'cuero' ? (
                                                <>
                                                    <img src="https://http2.mlstatic.com/D_NQ_NP_626492-MCO51160975398_082022-O.jpg"
                                                        className="img-fluid" alt="manilla cuero" />
                                                </>

                                            ) :
                                                <>
                                                    <img src="https://http2.mlstatic.com/D_NQ_NP_642546-MCO50997450359_082022-O.jpg"
                                                        className="img-fluid" alt="manilla cuerda" />
                                                </>

                                            }


                                        </div>
                                        <div className="col-md-1 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Material</p>
                                                <p className="lead fw-normal mb-0">{item.material}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-1 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Dije</p>
                                                <p className="lead fw-normal mb-0"><i className="fas fa-circle me-2" style={{ color: '#fdd8d2' }}></i>{item.dije}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Tipo</p>
                                                <p className="lead fw-normal mb-0">{item.tipo}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Cantidad</p>
                                                <div className='input-group'>
                                                    <input className="form-control text-center" type="number" min={1} max={100} value={item.cantidad} onChange={e => { cambiarCantidad(e, item) }} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Precio</p>
                                                <p className="lead fw-normal mb-0">{new Intl.NumberFormat().format(item.valor * conversion)}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                            <div>
                                                <p className="small text-muted mb-1 pb-1">Total</p>
                                                <p className="lead fw-normal mb-0">{new Intl.NumberFormat().format(item.valor * item.cantidad * conversion)}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-1 d-flex justify-content-center">
                                            <div className='d-flex align-items-center'>
                                                <button type="button" className="btn btn-outline-danger" onClick={() => eliminarDelCarrito(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="card mb-5">
                        <div className="card-body p-4">
                            <div className="float-start">
                                <span className='small text-muted'>Moneda </span>
                                <select className="form-select" name="select moneda" value={moneda} onChange={(e) => cambioMoneda(e.target.value)}>
                                    <option value="1">USD</option>
                                    <option value="2">COP</option>
                                </select>
                            </div>
                            <div className="float-end">
                                <p className="mb-0 me-5 d-flex align-items-center">
                                    <span className="small text-muted me-2">Order total:</span> <span
                                        className="lead fw-normal">{calcularTotal()}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row mt-2">

                            <div className="d-grid gap-2 col-6 mx-auto">


                                <button type="button" className="btn btn-outline-danger" onClick={handlepago}>Comprar</button>


                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Manilla