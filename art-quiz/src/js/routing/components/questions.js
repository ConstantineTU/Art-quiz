import routing from '../../../index'; // eslint-disable-line

class Questions {
  constructor() {
    this.imagesJSON = 'assets/json/images.json';
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
      this.j += 1;
    }
  }

  async getRandomAuthors(data, author) {
    const arr = [];
    arr.push(author);
    await new Promise((resolve) => {
      for (let i = 0; i < 3; i += 1) {
        const randomNum = this.getRandomNumber(0, data.length - 1);
        const randomAuthor = data[randomNum].author;
        let repeat = 0;
        for (let j = 0; j < 3; j += 1) {
          if (arr[j] === randomAuthor) {
            repeat = 1;
          }
        }
        if (!repeat) {
          arr.push(randomAuthor);
          resolve();
        } else {
          i -= 1;
          resolve();
        }
      }
    });
    return arr;
  }

  async getRandomPictures(data, picture) {
    const arr = [];
    arr.push(picture);
    let i = 0;
    const handleLoop = async () => {
      const randomNum = this.getRandomNumber(0, data.length - 1);
      let randomPicture;
      let repeat = false;
      await new Promise((resolve) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
        img.onload = () => {
          randomPicture = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
          resolve();
        };
      }).then(async () => {
        for (let j = 0; j < 3; j += 1) {
          if (arr[j] === randomPicture) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          arr.push(randomPicture);
          i += 1;
        } else {
          i -= 1;
        }
        if (i < 3) {
          await handleLoop();
        }
      });
    };
    await handleLoop();
    return arr;
  }

  shuffle(arrInput) {
    this.arr = arrInput;
    let j;
    let temp;
    for (let i = this.arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.arr[j];
      this.arr[j] = this.arr[i];
      this.arr[i] = temp;
    }
    return this.arr;
  }

  getRandomNumber(mi, ma) {
    this.min = Math.ceil(mi);
    this.max = Math.floor(ma);
    this.result = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return this.result;
  }
}

export default Questions;
