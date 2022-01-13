import routing from '../index'; // eslint-disable-line

function getTimeGame(duration, display, location) {
  const dis = display;
  const start = Date.now();
  let diff;
  let minutes;
  let seconds;

  const modalOverlay = document.getElementById('modalOverlay');
  function timer() {
    diff = Math.round(duration - ((Date.now() - start) / 1000 || 0));
    minutes = Math.round(diff / 60 || 0);
    seconds = Math.round(diff % 60 || 0);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    dis.textContent = `${minutes}:${seconds}`;
    if (modalOverlay.classList.contains('show')) {
      diff += 1;
      routing.repeatTimer(diff, dis, location);
    } else if (diff) {
      setTimeout(timer, 1000);
    }
    if (diff <= 0) {
      if (location.includes('#/picture-question-')) {
        routing.toLongAnswerPicture();
      } else {
        routing.toLongAnswerAuthor();
      }
    }
  }
  timer();
}

export default getTimeGame;
