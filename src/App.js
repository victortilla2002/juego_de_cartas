import { useState, useEffect } from "react";
import "./App.css";
 
function App() {
  const [cartas, setCartas] = useState([]);
  const [cartaSeleccionada1, setCartaSeleccionada1] = useState(null);
  const [cartaSeleccionada2, setCartaSeleccionada2] = useState(null);
  const [bloqueo, setBloqueo] = useState(false);
  const [intentos, setIntentos] = useState(0);
 
 
  // inicializar cartas
  useEffect(() => {
    reiniciarJuego();
  }, []);
 
  const inicializarCartas = () => {
    const cartasIniciales = [
      { id: 1, parejaId: 1, volteada: false },
      { id: 2, parejaId: 1, volteada: false },
      { id: 3, parejaId: 2, volteada: false },
      { id: 4, parejaId: 2, volteada: false },
      { id: 5, parejaId: 3, volteada: false },
      { id: 6, parejaId: 3, volteada: false },
      { id: 7, parejaId: 4, volteada: false },
      { id: 8, parejaId: 4, volteada: false },
      { id: 9, parejaId: 5, volteada: false },
      { id: 10, parejaId: 5, volteada: false },
      { id: 11, parejaId: 6, volteada: false },
      { id: 12, parejaId: 6, volteada: false },
    ];
    return cartasIniciales.sort(() => Math.random() - 0.5);
  };
 
  const manejarSeleccion = (carta) => {
    if (bloqueo) return;
    if (!carta.volteada) {
      carta.volteada = true;
      if (!cartaSeleccionada1) {
        setCartaSeleccionada1(carta);
      } else if (!cartaSeleccionada2) {
        setCartaSeleccionada2(carta);
        setBloqueo(true);
      }
    }
  };
 
  useEffect(() => {
    if (cartaSeleccionada1 && cartaSeleccionada2) {
      if (cartaSeleccionada1.parejaId === cartaSeleccionada2.parejaId) {
        setCartaSeleccionada1(null);
        setCartaSeleccionada2(null);
        setBloqueo(false);
      } else {
        setTimeout(() => {
          cartaSeleccionada1.volteada = false;
          cartaSeleccionada2.volteada = false;
          setCartaSeleccionada1(null);
          setCartaSeleccionada2(null);
          setBloqueo(false);
        }, 1000);
      }
      setIntentos((prev) => prev + 1);
    }
  }, [cartaSeleccionada1, cartaSeleccionada2]);
 
  const reiniciarJuego = () => {
    setCartas(inicializarCartas());
    setCartaSeleccionada1(null);
    setCartaSeleccionada2(null);
    setIntentos(0);
    setBloqueo(false);
  };
 
  return (
    <div className="app">
      <h1>react-parejas</h1>
      <button onClick={reiniciarJuego}>reiniciar</button>
      <div className="tablero">
        {cartas.map((carta) => (
          <div
            key={carta.id}
            className={`carta ${carta.volteada ? "volteada" : ""}`}
            onClick={() => manejarSeleccion(carta)}
          >
            {carta.volteada && <span>{carta.parejaId}</span>}
          </div>
        ))}
      </div>
      <p>intentos: {intentos}</p>
    </div>
  );
}
 
export default App;