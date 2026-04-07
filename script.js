function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");

  if (!bibtexElement) {
    return;
  }

  navigator.clipboard.writeText(bibtexElement.textContent).then(() => {
    const button = document.querySelector(".copy-bibtex-btn");
    if (!button) {
      return;
    }

    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = previous;
    }, 2000);
  });
}
