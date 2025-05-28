let currentIndex = 1; // Empezamos en 1 por los clones
const carousel = document.getElementById('promoCarouselImages');
const slides = document.querySelectorAll('#promoCarouselImages img');
const totalSlides = slides.length - 2; // Restamos los clones

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex*100}%)`;
}

function nextPromoSlide() {
  currentIndex++;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  updateCarousel();
  
  // Si llegamos al final (clone), saltamos sin animacion al inicio real
  if (currentIndex >= totalSlides + 1) {
    setTimeout(() => {
      carousel.style.transition = 'none';
      currentIndex = 1;
      updateCarousel();
    }, 500);
  }
}

function prevPromoSlide() {
  currentIndex--;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  updateCarousel();
  
  // Si llegamos al inicio (clone), saltamos sin animacion al final real
  if (currentIndex <= 0) {
    setTimeout(() => {
      carousel.style.transition = 'none';
      currentIndex = totalSlides;
      updateCarousel();
    }, 500);
  }
}

updateCarousel();

let autoPlayInterval = setInterval(nextPromoSlide, 5000);

carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
carousel.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(nextPromoSlide, 5000);
});

carousel.addEventListener('transitionend', () => {
  if (currentIndex >= totalSlides + 1) {
    carousel.style.transition = 'none';
    currentIndex = 1;
    updateCarousel();
  } else if (currentIndex <= 0) {
    carousel.style.transition = 'none';
    currentIndex = totalSlides;
    updateCarousel();
  }
});