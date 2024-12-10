import React, { useState, useEffect } from 'react';
import './index.css'; // Estilos CSS (si los tienes)

// Imágenes
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
  utterance.lang = 'es-ES'; // Configura el idioma en español
  speechSynthesis.speak(utterance); // Hablar el mensaje
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
  const [cartas, setCartas] = useState([]);
  const [cartasGiradas, setCartasGiradas] = useState([]);
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]);

  useEffect(() => {
    // Crear las cartas emparejadas
    const crearCartas = () => {
      let cartas = [];
      cartasImagenes.forEach(imagen => {
        cartas.push({ imagen, id: Math.random() });
        cartas.push({ imagen, id: Math.random() });
      });
      return cartas.sort(() => Math.random() - 0.5);
    };

    setCartas(crearCartas());
  }, []);

  const manejarClic = (indice) => {
    if (cartasGiradas.length < 2 && !cartasEmparejadas.includes(cartas[indice].imagen)) {
      setCartasGiradas((prev) => [...prev, indice]);
      anunciar(`Has seleccionado la carta número ${indice + 1}`);
    }
  };

  useEffect(() => {
    if (cartasGiradas.length === 2) {
      const [primerIndice, segundoIndice] = cartasGiradas;
      if (cartas[primerIndice].imagen === cartas[segundoIndice].imagen) {
        setCartasEmparejadas((prev) => [...prev, cartas[primerIndice].imagen]);
        anunciar('¡Las cartas coinciden!');
      }
      setTimeout(() => setCartasGiradas([]), 1000);
    }
  }, [cartasGiradas, cartas]);

  useEffect(() => {
    if (cartasEmparejadas.length === cartasImagenes.length) {
      anunciar('¡Felicidades! Has ganado el juego.');
    }
  }, [cartasEmparejadas]);

  return (
    <div className="juego-container">
      <header className="encabezado">
        <h1 className="titulo">¡Bienvenido al juego de parejas!</h1>
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
