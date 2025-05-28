document.querySelectorAll(".section-center").forEach((container) => {
  const carousel = container.querySelector(".carousel");
  const nextBtn = container.querySelector(".next");
  const prevBtn = container.querySelector(".prev");

  let scrollAmount = 0;
  const step = 300;

  nextBtn.addEventListener("click", () => {
    if (scrollAmount < carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount += step;
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (scrollAmount > 0) {
      scrollAmount -= step;
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });
});
