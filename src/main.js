let slideIndex = 1;
let isMovingForward = true;
showSlide(slideIndex);

function moveSlide(n) {
  isMovingForward = n > 0;
  showSlide((slideIndex += n));
}

document.querySelector('.prev').addEventListener('click', () => {
  moveSlide(-1);
});

document.querySelector('.next').addEventListener('click', () => {
  moveSlide(1);
});

function showSlide(n) {
  let slides = document.querySelectorAll('.slide');

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach(slide => {
    slide.style.display = 'none';
    slide.classList.remove(
      'active',
      'previous',
      'active-reverse',
      'previous-reverse'
    );
  });

  if (isMovingForward) {
    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex - 1].classList.add('active');

    let prevIndex = slideIndex - 2 < 0 ? slides.length - 1 : slideIndex - 2;
    slides[prevIndex].classList.add('previous');
  } else {
    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex - 1].classList.add('active-reverse');

    let nextIndex = slideIndex % slides.length;
    slides[nextIndex].classList.add('previous-reverse');
  }
}
