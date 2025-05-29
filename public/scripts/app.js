let currentSlide = 0;
let totalSlides = 0;

function initializeCarousel() {
  const slidesContainer = document.querySelector(".carousel-slides");
  if (!slidesContainer) return;

  slidesContainer.innerHTML = pipelineData
    .map((pipeline) => createPipelineSlide(pipeline))
    .join("");

  const slides = document.querySelectorAll(".carousel-slide");
  totalSlides = slides.length;

  if (slides.length > 0) {
    slides[0].classList.add("active");
  }

  generateIndicators();
  updateCarousel();
}

function generateIndicators() {
  const indicatorContainer = document.querySelector(".carousel-indicators");
  if (!indicatorContainer) return;

  indicatorContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("button");
    indicator.className = "carousel-indicator";
    indicator.onclick = () => goToSlide(i);
    indicator.setAttribute(
      "aria-label",
      `Go to slide ${i + 1} - ${pipelineData[i]?.title || "Pipeline"}`
    );

    if (i === 0) {
      indicator.classList.add("active");
    }

    indicatorContainer.appendChild(indicator);
  }
}

function updateCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".carousel-indicator");

  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function changeSlide(direction) {
  if (totalSlides === 0) return;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(slideIndex) {
  if (slideIndex >= 0 && slideIndex < totalSlides) {
    currentSlide = slideIndex;
    updateCarousel();
  }
}

window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

document.addEventListener("DOMContentLoaded", async function () {
  initializeCarousel();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
  });

  const outputContainer = document.querySelector(".output-container");
  if (outputContainer) {
    outputContainer.style.opacity = "1";
  }
});
