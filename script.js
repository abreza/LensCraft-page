async function loadSection(file, containerId) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await Promise.all([
    loadSection("header.html", "header-container"),
    loadSection("abstract.html", "abstract-container"),
    loadSection("pipeline.html", "pipeline-container"),
    loadSection("introduction.html", "introduction-container"),
  ]);
  const outputContainer = document.querySelector(".output-container");
  if (outputContainer) {
    outputContainer.style.opacity = "1";
  }
});
