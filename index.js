const minDistance = 100;
const obj = document.getElementById('foo');
const button = document.getElementById('myButton');

// Кэшируем размеры экрана для уменьшения количества вызовов
const maxX = window.innerWidth - 60;
const maxY = window.innerHeight - 60;

// Добавляем "throttle" на обработку событий 'mousemove' и 'touchmove', чтобы уменьшить количество вызовов функции
document.addEventListener('mousemove', throttle(handleMouseMove, 50));
document.addEventListener('touchmove', throttle(handleTouchMove, 50));

// Добавляем обработчики клика и сенсорного события на кнопку
button.addEventListener('click', changeButtonText);
button.addEventListener('touchstart', changeButtonText);

function handleMouseMove(evt) {
  const { x, y } = obj.getBoundingClientRect();
  const distance = calcDistance(evt.clientX, evt.clientY, x, y);
  
  if (distance < minDistance) {
    moveObjectRandomly();
  }
}

function handleTouchMove(evt) {
  // Получаем координаты касания пальца
  const touch = evt.touches[0];
  const { x, y } = obj.getBoundingClientRect();
  const distance = calcDistance(touch.clientX, touch.clientY, x, y);
  
  if (distance < minDistance) {
    moveObjectRandomly();
  }
}

function calcDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.hypot(dx, dy); // Более удобная встроенная функция для расчета гипотенузы
}

function moveObjectRandomly() {
  const randomX = getRandomInt(0, maxX);
  const randomY = getRandomInt(0, maxY);
  obj.style.left = `${randomX}px`;
  obj.style.top = `${randomY}px`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция throttle для ограничения частоты вызовов обработчика
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}
