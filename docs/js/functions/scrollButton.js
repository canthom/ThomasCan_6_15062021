const btnToTop = document.getElementById('btnToTop');

btnToTop.addEventListener('click', function() {
  // window.scrollTo(0, 0);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});