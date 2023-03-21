const images = document.querySelectorAll('.pic');
images.forEach(image => {
  image.addEventListener('click', () => {
    window.location.href = image.getAttribute("data-url");
  });
});
