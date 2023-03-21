const images = document.querySelectorAll('.img');
images.forEach(image => {
  image.addEventListener('click', () => {
    window.location.href = image.getAttribute("data-url");
  });
});
