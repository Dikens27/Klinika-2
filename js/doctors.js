let slideIndex = 1;
let isMovingForward = true;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
  showInitialSlide(); // Відображаємо перший слайд при завантаженні сторінки
});

document.querySelector('.prev').addEventListener('click', () => {
  if (!isAnimating) {
    moveSlide(-1);
  }
});

document.querySelector('.next').addEventListener('click', () => {
  if (!isAnimating) {
    moveSlide(1);
  }
});

function showInitialSlide() {
  let slides = document.querySelectorAll('.slide');
  slides[0].style.display = 'block'; // Відображаємо перший слайд
}

function moveSlide(n) {
  isAnimating = true; // Блокуємо повторне натискання кнопок під час анімації

  let slides = document.querySelectorAll('.slide');
  let previousSlideIndex = slideIndex - 1;

  // Оновлюємо slideIndex для нового слайда
  slideIndex += n;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  let currentSlide = slides[slideIndex - 1];
  let previousSlide = slides[previousSlideIndex];

  // Додаємо анімації
  if (n > 0) {
    currentSlide.style.display = 'block';
    previousSlide.classList.add('slideOutToLeft');
    currentSlide.classList.add('slideInFromRight');
  } else {
    currentSlide.style.display = 'block';
    previousSlide.classList.add('slideOutToRight');
    currentSlide.classList.add('slideInFromLeft');
  }

  previousSlide.addEventListener(
    'animationend',
    function () {
      previousSlide.style.display = 'none';
      previousSlide.classList.remove('slideOutToLeft', 'slideOutToRight');
      currentSlide.classList.remove('slideInFromRight', 'slideInFromLeft');
      isAnimating = false; // Анімація завершена, кнопки знову можна натискати
    },
    { once: true }
  );
}
