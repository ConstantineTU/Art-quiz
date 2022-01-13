import Routing from './routing';
import routing from '..';

class Questions {
  constructor() {
    // if (isRussian) {
    // 	quotes = 'assets/json/dataru.json'
    // } else {
    this.imagesJSON = 'assets/json/images.json';
    // }
    this.j = 0;
  }

  async loadAuthorPictures(number, numberJ) {
    if (numberJ) {
      this.j = 0;
    }
    const location = window.location.hash;
    const res = await fetch(this.imagesJSON);
    const data = await res.json();
    const author = await data[number].author;

    const imageNum = await data[number].imageNum;
    const name = await data[number].name;
    const year = await data[number].year;
    const imgMini = new Image();
    const imgFull = new Image();
    imgMini.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${number}.jpg`;
    imgFull.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/full/${number}full.jpg`;

    let authors;
    let pictures;
    if (location.includes('#/artist-question-')) {
      authors = await this.shuffle(await this.getRandomAuthors(data, author));
    } else if (location.includes('#/picture-question-')) {
      pictures = await this.shuffle(await this.getRandomPictures(data, imgMini.src));
    }
    if (this.j >= 10) {
      routing.gameOver();
    }
    // console.log(authors, `Нужный автор: ${author}`);
    // console.log(pictures, `Нужная картина: ${imgMini.src}`);
    if (location) {
      if (this.j >= 10 || number % 10 === 0) {
        this.j = 0;
      }
      routing.locationResolver(location, [
        imgFull.src,
        imgMini.src,
        pictures,
        author,
        authors,
        imageNum,
        name,
        year,
        this.j,
      ]);
      this.j++;
    }
  }

  async getRandomAuthors(data, author) {
    const arr = [];
    arr.push(author);
    for (let i = 0; i < 3; i++) {
      await new Promise(async (resolve, reject) => {
        const randomNum = this.getRandomNumber(0, data.length - 1);
        const randomAuthor = await data[randomNum].author;
        let repeat = 0;
        for (let j = 0; j < 3; j++) {
          if (arr[j] === randomAuthor) {
            repeat = 1;
            console.log('ПОВТОР', randomAuthor);
          }
        }
        if (!repeat) {
          arr.push(randomAuthor);
          resolve();
        } else {
          i--;
          resolve();
        }
      }).then(() => {});
    }
    return arr;
  }

  async getRandomPictures(data, picture) {
    const arr = [];
    arr.push(picture);
    for (let i = 0; i < 3; i++) {
      const randomNum = this.getRandomNumber(0, data.length - 1);
      let randomPicture;
      let repeat = false;
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
        img.onload = () => {
          randomPicture = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
          resolve();
        };
      }).then(() => {
        for (let j = 0; j < 3; j++) {
          if (arr[j] === randomPicture) {
            repeat = true;
            console.log('ПОВТОР', randomPicture);
            break;
          }
        }
        if (!repeat) {
          arr.push(randomPicture);
        } else {
          i--;
        }
      });
    }
    return arr;
  }

  async shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  getRandomNumber(mi, ma) {
    const min = Math.ceil(mi);
    const max = Math.floor(ma);
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  }
}

export default Questions;
