const broccoli = document.getElementById("runaway");
const tomato = document.getElementById("runaway2");
const egg = document.getElementById("runaway3");
/**Useing Anime.js*/
const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc"
  });
/**Add event listener to each*/
["mouseover", "click"].forEach(function (el) {
  broccoli.addEventListener(el, function (event) {
    const top = getRandomNumber(window.innerHeight - this.offsetHeight);
    const left = getRandomNumber(window.innerWidth - this.offsetWidth);
    animateMove(this, "left", left).play();
    animateMove(this, "top", top).play();
  });
});
["mouseover", "click"].forEach(function (el) {
    tomato.addEventListener(el, function (event) {
      const top = getRandomNumber(window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(window.innerWidth - this.offsetWidth);
      animateMove(this, "left", left).play();
      animateMove(this, "top", top).play();
    });
});
["mouseover", "click"].forEach(function (el) {
    egg.addEventListener(el, function (event) {
      const top = getRandomNumber(window.innerHeight - this.offsetHeight);
      const left = getRandomNumber(window.innerWidth - this.offsetWidth);
      animateMove(this, "left", left).play();
      animateMove(this, "top", top).play();
    });
});
const getRandomNumber = (num) => {
  return Math.floor(Math.random() * (num + 1));
};

