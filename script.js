document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const paletteContainer = document.querySelector(".palette-container");

  // Initialize palette on page load
  generatePalette();

  generateBtn.addEventListener("click", generatePalette);

  paletteContainer.addEventListener("click", (e) => {
    const copyBtn = e.target.closest(".copy-btn");
    const colorDiv = e.target.closest(".color");
    
    if (copyBtn || colorDiv) {
      const colorBox = (copyBtn || colorDiv).closest(".color-box");
      const hexValue = colorBox.querySelector(".hex-value").textContent;
      const targetBtn = colorBox.querySelector(".copy-btn");

      navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(targetBtn))
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
          alert("Failed to copy color code. Please try again.");
        });
    }
  });

  function showCopySuccess(copyBtn) {
    copyBtn.classList.remove("fas", "fa-copy");
    copyBtn.classList.add("fas", "fa-check");
    copyBtn.style.color = "#48bb78";
    copyBtn.setAttribute("aria-label", "Color code copied");

    setTimeout(() => {
      copyBtn.classList.remove("fas", "fa-check");
      copyBtn.classList.add("fas", "fa-copy");
      copyBtn.style.color = "";
      copyBtn.setAttribute("aria-label", "Copy color code");
    }, 1500);
  }

  function generatePalette() {
    const colorBoxes = document.querySelectorAll(".color-box");
    const colors = Array.from(colorBoxes).map(() => generateRandomColor());
    updatePaletteDisplay(colors);
  }

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
      if (colors[index]) {
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");
        colorDiv.style.backgroundColor = colors[index];
        hexValue.textContent = colors[index];
      }
    });
  }
});