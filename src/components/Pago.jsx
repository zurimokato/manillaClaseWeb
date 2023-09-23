import { useEffect, useState } from "react";


function Pago() {


  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [manillas, setManillas] = useState([]);
  const [moneda, setMoneda] = useState("");
  const [total, setTotal] = useState(0);




  const calcularCantidad = (productos) => {
    let cant = 0;
    for (let p = 0; p < productos.length; p++) {
      console.log(productos[p]);
      cant = cant + productos[p].cantidad;
    }

    return cant;

  }

  const handleClick=()=>{
    //navigateTo("/home");
  }

  useEffect(() => {

    const obternerInfoUsuario = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        console.log(user)
        setNombre(user.name);
        setCorreo(user.email);
      }
    };


    const obternerInfoCarrito = async () => {
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      if (carrito) {
        console.log(carrito);

        setCantidad(calcularCantidad(carrito.productos));
        setManillas(carrito.productos)
        setTotal(carrito.total);
        if(carrito.moneda=="1"){
          setMoneda("USD")
        }else{
          setMoneda("COP")
        }
      }
    };



    obternerInfoUsuario();
    obternerInfoCarrito();


  }, [])
  return (
    <div>
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (auto)">
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
          <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
          <li>
            <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
              <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#sun-fill"></use></svg>
              Light
              <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
              <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
              Dark
              <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
              <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
              Auto
              <svg className="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
        </ul>
      </div>


      <div className="container">
        <main>
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
          </div>
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tu carrito</span>
                <span className="badge bg-primary rounded-pill">{cantidad}</span>
              </h4>
              <ul className="list-group mb-3">
                {manillas.map((item) => (

                  <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                    <div>
                      <h6 className="my-0">{item.material.toUpperCase()}</h6>
                      <small className="text-body-secondary">{item.dije} - {item.tipo}</small>
                    </div>
                    <span className="text-body-secondary">${item.valor}</span>
                  </li>

                ))}

                <li className="list-group-item d-flex justify-content-between">

                  <span>Total ({moneda})</span>

                  <strong>${total}</strong>

                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" />
                  <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
              </form>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" >
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email <span className="text-body-secondary">(Opcional)</span></label>
                    <input type="email" className="form-control" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="you@example.com" />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección 2 <span className="text-body-secondary">(Opcional)</span></label>
                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                  </div>

                  <div className="col-md-5">
                    <label className="form-label">Pais</label>
                    <select className="form-select" id="country" required>
                      <option >Selecciona...</option>
                      <option>Colombia</option>
                    </select>
                    <div className="invalid-feedback">
                      Selecciona un país valido
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Ciudad</label>
                    <select className="form-select" id="state" required>
                      <option >Selecciona...</option>
                      <option>Santa Marta</option>
                    </select>
                    <div className="invalid-feedback">
                      Selecciona una ciudad valida
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="same-address" />
                  <label className="form-check-label" >La dirección de envío es la misma que mi dirección de facturación.</label>
                </div>

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="save-info" />
                  <label className="form-check-label">Guarda esta información para la próximas compras</label>
                </div>
                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" onClick={handleClick}>Continuar a pagar</button>
              </form>
            </div>
          </div>
        </main>

        <footer className="my-5 pt-5 text-body-secondary text-center text-small">
          <p className="mb-1">&copy; 2017–2023 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
        <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
        <script src="checkout.js"></script>
      </div>

    </div>
  )
}
export default Pago