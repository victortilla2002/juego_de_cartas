# Juego de Parejas en React

¡Bienvenido al juego de **Memoria** o **Parejas**! Este juego consiste en emparejar cartas con imágenes similares, girándolas una a una hasta encontrar todos los pares.

## 🎮 Características

- **Cartas con imágenes**: 
  El juego utiliza un conjunto de imágenes que se duplican y se barajan para formar un mazo de cartas ocultas.

- **Interactividad**: 
  Haz clic en las cartas para girarlas y revelar las imágenes. Si dos cartas tienen la misma imagen, se mantendrán giradas.

- **Voz**: 
  Gracias a la API de SpeechSynthesis, el juego anuncia en voz alta las acciones del jugador, como seleccionar una carta o encontrar un par.

- **Reinicio automático**: 
  Cuando todos los pares se emparejan correctamente, se muestra un mensaje de victoria y el juego se reinicia automáticamente.

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **CSS**: Estilos personalizados que incluyen transiciones y efectos de animación.
- **SpeechSynthesisUtterance**: API del navegador para convertir texto en voz y mejorar la experiencia interactiva.
