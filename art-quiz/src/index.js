import './assets/scss/style.scss';
import Routing from './js/routing';

let routing;
async function startArtQuiz() {
  routing = new Routing();
}
startArtQuiz();

export default routing;
