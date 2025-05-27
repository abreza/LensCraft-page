async function loadSection(file, containerId) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

let currentSlide = 0;
const totalSlides = 3;

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
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

document.addEventListener("DOMContentLoaded", async function () {
  await Promise.all([
    loadSection("header.html", "header-container"),
    loadSection("abstract.html", "abstract-container"),
    loadSection("pipeline.html", "pipeline-container"),
    loadSection("introduction.html", "introduction-container"),
  ]);

  updateCarousel();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
  });

  const outputContainer = document.querySelector(".output-container");
  if (outputContainer) {
    outputContainer.style.opacity = "1";
  }
});
