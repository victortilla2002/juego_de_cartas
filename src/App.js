/**
 * Juego de parejas en React.
 *
 * Este componente implementa un juego de cartas en el que el jugador debe emparejar cartas con imágenes similares.
 * El juego se juega con un conjunto de imágenes duplicadas, las cuales son barajadas y ocultas en cartas con un reverso.
 * El jugador puede hacer clic en las cartas para girarlas y revelar las imágenes. Si se emparejan dos cartas con la misma imagen,
 * las cartas se mantienen giradas. El juego termina cuando todas las cartas han sido emparejadas correctamente.
 * Una vez que el jugador ha ganado, se muestra un mensaje de victoria y el juego se reinicia automáticamente al hacer clic en "Aceptar".
 *
 * Funciones principales:
 * - `crearCartas`: Crea y baraja las cartas del juego.
 * - `manejarClic`: Maneja el clic sobre las cartas, girándolas y verificando si hay un par coincidente.
 * - `anunciar`: Reproduce un mensaje en voz alta para describir las acciones o el estado del juego.
 * - `descripcionDeLaCarta`: Devuelve una descripción textual de la carta seleccionada.
 *
 * Dependencias:
 * - React
 * - SpeechSynthesisUtterance para la función de voz (anuncios).
 *
 * Imágenes utilizadas:
 * - Cereza, Fruta de la pasión, Naranja, Pera, Piña, Sandía, Melón, Fresita.
 *
 * @IvanDonaireMena
 * @VictorBenitez
 */
import React, { useState, useEffect } from 'react';
import './index.css';
 
// Imágenes de las cartas
import imagen1 from './img/cereza.png';
import imagen2 from './img/frutaPasion.png';
import imagen3 from './img/naranja.png';
import imagen4 from './img/pera.png';
import imagen5 from './img/piña.png';
import imagen6 from './img/sandia.png';
import imagen7 from './img/interrogacion.png';
import imagen8 from './img/melon.png';
import imagen9 from './img/fresita.png';
 
const cartasImagenes = [
  imagen1, imagen2, imagen3, imagen4,
  imagen5, imagen6, imagen8, imagen9
];
 
// Función para anunciar un mensaje en voz alta
const anunciar = (mensaje) => {
  const utterance = new SpeechSynthesisUtterance(mensaje);
  utterance.lang = 'es-ES';
  speechSynthesis.speak(utterance);
};
 
// Función para describir las cartas
const descripcionDeLaCarta = (imagen) => {
  const descripciones = {
    [imagen1]: 'Cereza',
    [imagen2]: 'Fruta de la pasión',
    [imagen3]: 'Naranja',
    [imagen4]: 'Pera',
    [imagen5]: 'Piña',
    [imagen6]: 'Sandía',
    [imagen8]: 'Melón',
    [imagen9]: 'Fresita',
  };
  return descripciones[imagen] || 'Carta desconocida';
};
 
// Componente Carta: Define cómo se visualiza una carta
const Carta = ({ imagen, estaGirada, onClick }) => {
  useEffect(() => {
    if (estaGirada) {
      anunciar(`Mostrando la imagen de ${descripcionDeLaCarta(imagen)}`);
    }
  }, [estaGirada, imagen]);
 
  return (
    <div
      className={`carta ${estaGirada ? 'girada' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={estaGirada ? `Carta girada, mostrando ${descripcionDeLaCarta(imagen)}` : 'Carta oculta'}
    >
      <div className="cara frontal">
        <img src={imagen7} alt="Reverso de la carta" />
      </div>
      <div className="cara trasera">
        <img src={imagen} alt={`Imagen de la carta: ${descripcionDeLaCarta(imagen)}`} />
      </div>
    </div>
  );
};
 
const JuegoCartas = () => {
  const [cartas, setCartas] = useState([]); // Estado que guarda todas las cartas
  const [cartasGiradas, setCartasGiradas] = useState([]); // Estado que guarda las cartas giradas
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]); // Estado que guarda las cartas emparejadas
  const [tiempo, setTiempo] = useState(0); // Estado para el tiempo transcurrido
  const [intervalo, setIntervalo] = useState(null); // Estado para el intervalo del cronómetro
 
  useEffect(() => {
    // Función para crear y barajar las cartas
    const crearCartas = () => {
      let cartas = [];
      cartasImagenes.forEach(imagen => {
        cartas.push({ imagen, id: Math.random() });
        cartas.push({ imagen, id: Math.random() });
      });
      return cartas.sort(() => Math.random() - 0.5); // Baraja las cartas
    };
 
    setCartas(crearCartas()); // Inicializa el mazo de cartas
 
    // Inicia el cronómetro
    const intervaloId = setInterval(() => {
      setTiempo((prevTiempo) => prevTiempo + 1);
    }, 1000);
    setIntervalo(intervaloId);
 
    return () => clearInterval(intervaloId); // Limpia el intervalo al desmontar el componente
  }, []);
 
  // Función que maneja el clic en una carta
  const manejarClic = (indice) => {
    if (cartasGiradas.length < 2 && !cartasEmparejadas.includes(cartas[indice].imagen)) {
      setCartasGiradas((prev) => [...prev, indice]);
      anunciar(`Has seleccionado la carta número ${indice + 1}`);
    }
  };

  useEffect(() => {
    // Verifica si las cartas giradas coinciden
    if (cartasGiradas.length === 2) {
      const [primerIndice, segundoIndice] = cartasGiradas;
      if (cartas[primerIndice].imagen === cartas[segundoIndice].imagen) {
        setCartasEmparejadas((prev) => [...prev, cartas[primerIndice].imagen]);
        anunciar('¡Las cartas coinciden!');
      }
      setTimeout(() => setCartasGiradas([]), 1000); // Reinicia las cartas giradas después de un breve retraso
    }
  }, [cartasGiradas, cartas]);
 
  useEffect(() => {
    // Verifica si todas las cartas están emparejadas
    if (cartasEmparejadas.length === cartasImagenes.length) {
      clearInterval(intervalo); // Detiene el cronómetro
      anunciar('¡Felicidades! Has ganado el juego.');
      alert('¡Felicidades! Has ganado el juego.');

      // Reinicia el juego cuando el usuario haga clic en "Aceptar"
      const reiniciarJuego = () => {
        setCartas(crearCartas()); // Regenera las cartas
        setCartasGiradas([]); // Limpia las cartas giradas
        setCartasEmparejadas([]); // Limpia las cartas emparejadas
        setTiempo(0); // Reinicia el tiempo
        const nuevoIntervaloId = setInterval(() => {
          setTiempo((prevTiempo) => prevTiempo + 1);
        }, 1000);
        setIntervalo(nuevoIntervaloId);
      };
      reiniciarJuego();
    }
  }, [cartasEmparejadas]);
 
  // Función para crear y barajar las cartas
  const crearCartas = () => {
    let cartas = [];
    cartasImagenes.forEach(imagen => {
      cartas.push({ imagen, id: Math.random() });
      cartas.push({ imagen, id: Math.random() });
    });
    return cartas.sort(() => Math.random() - 0.5); // Baraja las cartas
  };
 
  const formatTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(0, '0')}:${segundosRestantes.toString().padStart(2  , '0')}`;
  };
 
  return (
    <div className="juego-container">
      <header className="encabezado">
        <h1 className="titulo">¡Bienvenido al juego de parejas!</h1>
        <p className="cronometro">Tiempo transcurrido: {formatTiempo(tiempo)}</p>
      </header>
      <div className="juego">
        <div className="cartas">
          {cartas.map((carta, index) => (
            <Carta
              key={carta.id}
              imagen={carta.imagen}
              estaGirada={cartasGiradas.includes(index) || cartasEmparejadas.includes(carta.imagen)}
              onClick={() => manejarClic(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default JuegoCartas;