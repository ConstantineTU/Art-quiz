import Questions from './questions'; // eslint-disable-line
import Sound from './sound';
import Settings from './settings'; // eslint-disable-line
import timeGame from './time-game';

class Routing {
  constructor() {
    this.main = document.querySelector('#main-container');
    this.header = document.getElementById('header');
    this.body = document.querySelector('body');
    this.isTimeGame = document.querySelector('.settings-main_timegame');
    this.countTime = document.querySelector('.settings-main_amount');

    this.audioCorrect = new Audio();
    this.audioUncorrect = new Audio();
    this.audioEnd = new Audio();
    this.audioClick = new Audio();
    this.audioClick.src = './assets/sounds/click.mp3';
    this.audioCorrect.src = './assets/sounds/correct.mp3';
    this.audioUncorrect.src = './assets/sounds/uncorrect.mp3';
    this.audioEnd.src = './assets/sounds/end.mp3';

    this.questions = new Questions();
    this.sound = new Sound([this.audioCorrect, this.audioUncorrect, this.audioEnd, this.audioClick]);
    this.settings = new Settings();

    this.modalExit = document.getElementById('modalExit');
    this.modalCorrect = document.getElementById('modalCorrect');
    this.modalEnd = document.getElementById('modalEnd');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalButtons = document.querySelectorAll('.modal-button');
    this.modalPicture = document.querySelector('.modal-correct-picture');
    this.modalNamePicture = document.querySelector('.modal-correct-name');
    this.modalAuthorPicture = document.querySelector('.modal-correct-author');
    this.modalYearPicture = document.querySelector('.modal-correct-year');
    this.modalIconPicture = document.querySelector('.modal-correct-icon');
    this.modalButtonNextQuiz = document.querySelector('.modal-button-plus');
    this.modalButtonCategories = document.querySelector('.modal-button-categories');
    this.modalEndResult = document.querySelector('.modal-end-title-result');

    this.buttonsClick = document.querySelectorAll('.click');

    this.artistCategories = `
		<div class="artist-container">
		<div class="artist">
			<div class="artist_body">
				<a id="0" href="#/artist-question-0/" data-href="#/artist-question-0/">
					<div data-categ="0" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">1 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/1.jpg" alt=""></div>
					</div>
				</a>
				<a id="1" href="#/artist-question-1/" data-href="#/artist-question-1/">
					<div data-categ="1" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">2 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/2.jpg" alt=""></div>
					</div>
				</a>
				<a id="2" href="#/artist-question-2/" data-href="#/artist-question-2/">
					<div data-categ="2" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">3 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/3.jpg" alt=""></div>
					</div>
				</a>
				<a id="3" href="#/artist-question-3/" data-href="#/artist-question-3/">
					<div data-categ="3" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">4 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/4.jpg" alt=""></div>
					</div>
				</a>
				<a id="4" href="#/artist-question-4/" data-href="#/artist-question-4/">
					<div data-categ="4" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">5 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/5.jpg" alt=""></div>
					</div>
				</a>
				<a id="5" href="#/artist-question-5/" data-href="#/artist-question-5/">
					<div data-categ="5" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">6 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/6.jpg" alt=""></div>
					</div>
				</a>
				<a id="6" href="#/artist-question-6/" data-href="#/artist-question-6/">
					<div data-categ="6" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">7 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/7.jpg" alt=""></div>
					</div>
				</a>
				<a id="7" href="#/artist-question-7/" data-href="#/artist-question-7/">
					<div data-categ="7" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">8 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/8.jpg" alt=""></div>
					</div>
				</a>
				<a id="8" href="#/artist-question-8/" data-href="#/artist-question-8/">
					<div data-categ="8" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">9 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/9.jpg" alt=""></div>
					</div>
				</a>
				<a id="9" href="#/artist-question-9/" data-href="#/artist-question-9/">
					<div data-categ="9" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">10 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/10.jpg" alt=""></div>
					</div>
				</a>
				<a id="10" href="#/artist-question-10/" data-href="#/artist-question-10/">
					<div data-categ="10" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">11 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/11.jpg" alt=""></div>
					</div>
				</a>
				<a id="11" href="#/artist-question-11/" data-href="#/artist-question-11/">
					<div data-categ="11" class="artist_item">
						<div class="artist_item-title-container">
							<div class="artist_item-title">12 categori</div>
							<div class="artist_item-count-container">
								<span class="artist_item-count">0</span>/10
							</div>
						</div>
						<div class="artist_item-img"><img class="artist-img"
								src="assets/img/categories_artist/12.jpg" alt=""></div>
					</div>
				</a>
			</div>
		</div>
	</div>
		`;
    this.picturesCategories = `
		<div class="pictures-container">
		<div class="pictures">
			<div class="pictures_body">

				<a id="12" href="#/picture-question-12/" data-href="#/picture-question-12/">
					<div data-categ="12" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">12 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/1.jpg" alt=""></div>
					</div>
				</a>
				<a id="13" href="#/picture-question-13/" data-href="#/picture-question-13/">
					<div data-categ="13" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">13 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/2.jpg" alt=""></div>
					</div>
				</a>
				<a id="14" href="#/picture-question-14/" data-href="#/picture-question-14/">
					<div data-categ="14" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">14 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/3.jpg" alt=""></div>
					</div>
				</a>
				<a id="15" href="#/picture-question-15/" data-href="#/picture-question-15/">
					<div data-categ="15" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">15 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/4.jpg" alt=""></div>
					</div>
				</a>
				<a id="16" href="#/picture-question-16/" data-href="#/picture-question-16/">
					<div data-categ="16" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">16 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/5.jpg" alt=""></div>
					</div>
				</a>
				<a id="17" href="#/picture-question-17/" data-href="#/picture-question-17/">
					<div data-categ="17" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">17 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/6.jpg" alt=""></div>
					</div>
				</a>
				<a id="18" href="#/picture-question-18/" data-href="#/picture-question-18/">
					<div data-categ="18" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">18 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/7.jpg" alt=""></div>
					</div>
				</a>
				<a id="19" href="#/picture-question-19/" data-href="#/picture-question-19/">
					<div data-categ="19" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">19 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/8.jpg" alt=""></div>
					</div>
				</a>
				<a id="20" href="#/picture-question-20/" data-href="#/picture-question-20/">
					<div data-categ="20" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">20 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/9.jpg" alt=""></div>
					</div>
				</a>
				<a id="21" href="#/picture-question-21/" data-href="#/picture-question-21/">
					<div data-categ="21" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">21 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/10.jpg" alt=""></div>
					</div>
				</a>
				<a id="22" href="#/picture-question-22/" data-href="#/picture-question-22/">
					<div data-categ="22" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">22 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/11.jpg" alt=""></div>
					</div>
				</a>
				<a id="23" href="#/picture-question-23/" data-href="#/picture-question-23/">
					<div data-categ="23" class="pictures_item">
						<div class="pictures_item-title-container">
							<div class="pictures_item-title">23 categori</div>
							<div class="pictures_item-count-container">
								<span class="pictures_item-count">0</span>/10
							</div>
						</div>
						<div class="pictures_item-img"><img class="picture-img"
								src="assets/img/categories_pictures/12.jpg" alt=""></div>
					</div>
				</a>
			</div>
		</div>
	</div>
			`;
    this.mainHtml = `
		<div class="title-cotainer">
						<h1 class="title">Art Quiz</h1>
						<div class="categories-container">
							<a id="categories-artist" href="#/artist/" data-href="#/artist/" ><button id="categories-artist"
									class=" button_menu click">Artist quiz</button></a>
							<a id="categories-pictures" href="#/pictures/" data-href="#/pictures/" ><button
									class=" button_menu click">Pictures
									quiz</button></a>
						</div>
					</div>
		`;
    this.mainHeader = `
		<div class="header-left">
				<div class="header-logo"></div>
				<a id="main-menu-categories" href="#/" data-href="#/">
					<div class="header-left-categories"><span id="headerCategoriesName"
							class="header-left-categories-name click">Pictures</span> categories</div>
				</a>
			</div>
			<div class="header-right">
				<a href="#/pictures/" data-href="#/pictures/">
				<div class="header-right-categories">Categories</div>
				</a>
				<div class="header-right-score">Score</div>
				<div class="header-settings">
					<div id="settings-open" class="header-settings_icon click"></div>
				</div>
			</div>
		`;
    this.questionsAuthorHeader = `
		<div class="questions-author-header">
				<div id="questions-author-header-main"  class="click questions-author-header_exit-icon"></div>
				<div class="questions-author-time-progress"></div>
				<div class="questions-author-time-container">
					<div class="questions-author-time"><span class="questions-author-time_count"></span></div>
				</div>
			</div>
		`;
    this.questionsPictureHeader = `
		<div class="questions-picture-header">
		<div id="questions-author-header-main"  class="click questions-author-header_exit-icon"></div>
				<div class="questions-picture-time-progress"></div>
				<div class="questions-picture-time-container">
					<div class="questions-picture-time"><span class="questions-picture-time_count"></span></div>
				</div>
			</div>
		`;
    this.i = 0;
    this.isCategoriesLoad = false;
    window.addEventListener('load', async () => {
      const location = window.location.hash;
      if (location) {
        if (location.includes('#/artist-question-')) {
          this.i = location.split('-', 3)[2].split('/', 1) * 10;
        }
        this.locationResolver(location);
      }
    });
    window.addEventListener('hashchange', async () => {
      const location = window.location.hash;
      if (location) {
        if (location.includes('#/artist-question-')) {
          this.i = location.split('-', 3)[2].split('/', 1) * 10;
        }
        this.locationResolver(location);
      }
    });
    this.buttonsClick.forEach((click) => {
      click.onclick = () => this.sound.playSound(this.audioClick);
    });
  }

  async locationResolver(location, info) {
    if (this.modalEnd.classList.contains('show')) {
      this.modalEnd.classList.remove('show');
      setTimeout(() => {
        this.modalOverlay.classList.remove('show');
      }, 1000);
    } else {
      this.modalExit.classList.remove('show');
      this.modalCorrect.classList.remove('show');
      this.modalOverlay.classList.remove('show');
    }

    if (!info && location.includes('#/artist-question-')) {
      await this.questions.loadAuthorPictures(this.i);
      return;
    }
    if (!info && location.includes('#/picture-question-')) {
      this.i = location.split('-', 3)[2].split('/', 1) * 10;
      await this.questions.loadAuthorPictures(this.i);
      return;
    }
    if (info) {
      this.picture = info[0];
      this.pictureMini = info[1];
      this.randomPictures = info[2];
      this.author = info[3];
      this.randomAuthors = info[4];
      this.imageNum = info[5];
      this.name = info[6];
      this.year = info[7];
      this.j = info[8];
    } else {
      this.picture = 'https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/full/0full.jpg';
    }
    if (document.getElementById('categories-artist')) {
      this.categoriesArtist = document.getElementById('categories-artist');
      this.categoriesPictures = document.getElementById('categories-pictures');
    }
    if (document.getElementById('main-menu-categories')) {
      this.mainMenuCategories = document.getElementById('main-menu-categories');
      this.mainMenuHome = document.getElementById('main-menu-home');
    }
    if (location === '#/artist/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0, 1) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = `
			<div class="header-left">
					<div class="header-logo"></div>
					<a id="main-menu-categories" href="#/" data-href="#/">
						<div class="header-left-categories"><span id="headerCategoriesName"
								class="header-left-categories-name click">Artist</span> categories</div>
					</a>
				</div>
				<div class="header-right">
					<a href="#/pictures/" data-href="#/pictures/">
					<div class="header-right-categories click">Pictures categories</div>
					</a>
					<div class="header-right-score">Score</div>
					<div class="header-settings">
						<div id="settings-open" class="header-settings_icon click "></div>
					</div>
				</div>
			`;
      this.buttonsClick.forEach((click) => {
        click.onclick = () => this.sound.playSound(this.audioClick);
      });
      this.main.innerHTML = this.artistCategories;
      this.artistItemImg = document.querySelectorAll('.artist_item-img');
      this.artistItemImg.forEach((artist) => {
        artist.parentElement.parentElement.addEventListener('click', function () {
          localStorage.setItem(`artist.id${this.id}`, this.id);
          console.log(this.id);
        });
      });
      this.artistItemImg.forEach((artist) => {
        for (let i = 0; i < 12; i += 1) {
          if (artist.parentElement.parentElement.id === localStorage.getItem(`artist.id${i}`)) {
            artist.parentElement.classList.add('active');
            artist.classList.add('active');
          }
        }
      });
      this.settings = new Settings();
      this.i = 0;
    } else if (location === '#/pictures/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = `
			<div class="header-left">
					<div class="header-logo"></div>
					<a id="main-menu-categories" href="#/" data-href="#/">
						<div class="header-left-categories"><span id="headerCategoriesName"
								class="header-left-categories-name">Pictures</span> categories</div>
					</a>
				</div>
				<div class="header-right">
					<a href="#/artist/" data-href="#/artist/">
					<div class="header-right-categories">Artist categories</div>
					</a>
					<div class="header-right-score">Score</div>
					<div class="header-settings">
						<div id="settings-open" class="header-settings_icon click"></div>
					</div>
				</div>
			`;
      this.buttonsClick.forEach((click) => {
        click.onclick = () => {
          this.sound.playSound(this.audioClick);
        };
      });
      this.main.innerHTML = this.picturesCategories;
      this.picturesItemImg = document.querySelectorAll('.pictures_item-img');
      this.picturesItemImg.forEach((picture) => {
        picture.parentElement.parentElement.addEventListener('click', function () {
          localStorage.setItem(`picture.id${this.id}`, this.id);
          console.log(this.id);
        });
      });
      this.picturesItemImg.forEach((picture) => {
        for (let i = 12; i < 24; i += 1) {
          if (picture.parentElement.parentElement.id === localStorage.getItem(`picture.id${i}`)) {
            picture.parentElement.classList.add('active');
            picture.classList.add('active');
          }
        }
      });
      this.i = 0;
      this.settings = new Settings();
    } else if (location.includes('#/artist-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 12) {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        };
      }
      this.modalButtons.forEach((button) => {
        button.onclick = () => {
          button.parentElement.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.questions.loadAuthorPictures(this.i);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.questionsAuthorHeader;
      this.main.innerHTML = `
			<div class="questions-author">
							<div class="questions-author-container">
								<h2 class="questions-author-title">Who is the author of this picture?</h2>
								<div class="questions-author-picture" style="background: url('${
                  this.picture
                }') no-repeat scroll center center /contain;"></div>
								<div class="questions-author-bullets">
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
									<div class="questions-author-bullet"></div>
								</div>
								<div class="questions-author-answers">
									<a href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/artist-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
										<button class="button_menu questions-author-answer">${this.randomAuthors[0]}</button></a>
									<a href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/artist-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
										<button class="button_menu questions-author-answer">${this.randomAuthors[1]}</button></a>
									<a href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/artist-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
										<button class="button_menu questions-author-answer">${this.randomAuthors[2]}</button></a>
									<a href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/artist-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
										<button class="button_menu questions-author-answer">${this.randomAuthors[3]}</button></a>
								</div>
							</div>
						</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-author-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        timeGame(this.fiveMinutes, this.display, location);
      }

      this.buttonsClick.forEach((click) => {
        click.onclick = () => this.sound.playSound(this.audioClick);
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/artist/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/artist/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-author-bullet');
      if (this.i === 0 || this.i % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.i = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }

      const answers = document.querySelectorAll('.questions-author-answer');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = async () => {
          if (answers[i].textContent === this.author) {
            localStorage.setItem(`bullet${this.j}`, '#3dda69');
            localStorage.setItem(`picture${this.i}`, true);
            bullets[this.j].style.background = '#3dda69';
            answers[i].style.background = '#3dda69';
            answers[i].style.color = '#000000';
            this.modalCorrect.classList.add('show');
            this.modalOverlay.classList.add('show');
            console.log(this.modalIconPicture);
            this.modalIconPicture.style.background = `url("./assets/img/svg/correct_answer.svg") no-repeat`;
            this.modalCorrect.style.zIndex = 5;
            this.sound.playSound(this.audioCorrect);
            // alert('Правильный ответ!')
          } else {
            localStorage.setItem(`bullet${this.j}`, '#d82727');
            localStorage.setItem(`picture${this.i}`, false);
            bullets[this.j].style.background = '#d82727';
            answers[i].style.background = '#d82727';
            answers[i].style.color = '#000000';
            this.modalCorrect.classList.add('show');
            this.modalOverlay.classList.add('show');
            this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
            this.modalCorrect.style.zIndex = 5;
            this.sound.playSound(this.audioUncorrect);
            // alert('Неправильный ответ!')
          }
        };
      }
      this.i += 1;
    } else if (location.includes('#/picture-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 24) {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        };
      }
      this.modalButtons.forEach((button) => {
        button.onclick = () => {
          button.parentElement.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.questions.loadAuthorPictures(this.i);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.questionsPictureHeader;
      this.main.innerHTML = `
			<div class="questions-picture">
			<div class="questions-picture-container">
				<h2 class="questions-picture-title">Which is <span id="questions-picture-author"
						class="questions-picture-author">${this.author}</span> picture?</h2>
	
				<div class="questions-picture-answers">
					<a href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/picture-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
					<div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
            this.randomPictures[0]
          }" alt=""></div>
					</a>
					<a href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/picture-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
					<div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
            this.randomPictures[1]
          }" alt=""></div>
					</a>
					<a href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/picture-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
						<div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
              this.randomPictures[2]
            }" alt=""></div>
					</a>
					<a href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/" data-href="#/picture-question-${location
        .split('-', 3)[2]
        .split('/', 1)}/">
					<div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
            this.randomPictures[3]
          }" alt=""></div>
					</a>
				</div>
				<div class="questions-picture-bullets">
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
					<div class="questions-picture-bullet"></div>
				</div>
			</div>
		</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-picture-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        timeGame(this.fiveMinutes, this.display, location);
      }
      this.buttonsClick.forEach((click) => {
        click.onclick = () => {
          this.sound.playSound(this.audioClick);
        };
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/pictures/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/pictures/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-picture-bullet');
      if (this.i === 0 || this.i % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.i = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }
      const answers = document.querySelectorAll('.questions-picture-answer-img');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = async () => {
          if (answers[i].src === this.pictureMini) {
            this.modalIconPicture.style.background = `url("./assets/img/svg/correct_answer.svg") no-repeat`;
            localStorage.setItem(`bullet${this.j}`, '#3dda69');
            bullets[this.j].style.background = '#3dda69';
            answers[i].classList.add('correct');
            this.modalCorrect.classList.add('show');
            this.modalOverlay.classList.add('show');
            this.sound.playSound(this.audioCorrect);
            this.modalCorrect.style.zIndex = 5;
          } else {
            this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
            localStorage.setItem(`bullet${this.j}`, '#d82727');
            bullets[this.j].style.background = '#d82727';
            answers[i].classList.add('uncorrect');
            this.modalCorrect.classList.add('show');
            this.modalOverlay.classList.add('show');
            this.sound.playSound(this.audioUncorrect);
            this.modalCorrect.style.zIndex = 5;
          }
        };
      }
      this.i += 1;
    } else if ('#/') {
      this.body.style.background = `rgba(0, 0, 0) url("./assets/img/main-screen/main_background2.jpg") no-repeat scroll center center /
			cover`;
      this.i = 0;
      this.header.classList.remove('active');
      this.header.innerHTML = this.mainHeader;
      this.main.innerHTML = this.mainHtml;
      this.buttonsClick.forEach((click) => {
        click.onclick = () => {
          this.sound.playSound(this.audioClick);
        };
      });
      this.settings = new Settings();
    }
  }

  gameOver() {
    setTimeout(() => {
      this.modalEnd.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalEnd.style.zIndex = 5;
      this.sound.playSound(this.audioEnd);
    }, 500);
  }

  toLongAnswerAuthor() {
    const bullets = document.querySelectorAll('.questions-author-bullet');
    const answers = document.querySelectorAll('.questions-author-answer');
    for (let i = 0; i < answers.length; i += 1) {
      localStorage.setItem(`bullet${this.j}`, '#d82727');
      bullets[this.j].style.background = '#d82727';
      answers[i].style.background = '#d82727';
      answers[i].style.color = '#000000';
      this.modalCorrect.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      this.modalCorrect.style.zIndex = 5;
      this.sound.playSound(this.audioUncorrect);
    }
  }

  toLongAnswerPicture() {
    const bullets = document.querySelectorAll('.questions-picture-bullet');
    const answers = document.querySelectorAll('.questions-picture-answer-img');
    for (let i = 0; i < answers.length; i += 1) {
      localStorage.setItem(`bullet${this.j}`, '#d82727');
      bullets[this.j].style.background = '#d82727';
      answers[i].style.background = '#d82727';
      answers[i].style.color = '#000000';
      this.modalCorrect.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      this.modalCorrect.style.zIndex = 5;
      this.sound.playSound(this.audioUncorrect);
    }
  }

  repeatTimer(diff, display, location) {
    const modalExiteIcon = document.querySelector('.modal-exite-icon');
    modalExiteIcon.addEventListener('click', () => {
      timeGame(diff, display, location);
    });
  }

  getSoundInRouting() {
    this.sound.playSound(this.audioClick);
  }
}

export default Routing;
