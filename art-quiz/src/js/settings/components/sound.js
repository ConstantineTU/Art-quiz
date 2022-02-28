class Sound {
  constructor(arrSounds) {
    this.arrSounds = arrSounds;
    this.volume = document.getElementById('settings-volume');
    this.volumeOff = document.querySelector('.settings-main_volume-icons-off');
    this.volume.addEventListener('change', () => {
      for (let i = 0; i < arrSounds.length; i += 1) {
        this.arrSounds[i].currentTime = 0;
        if (i === 0) {
          this.arrSounds[3].play();
        }
        const { value } = this.volume;
        this.arrSounds[i].volume = value;
        this.volume.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${value * 100}%, #c4c4c4 ${
          value * 100
        }%, #c4c4c4 100%)`;
        if (value) {
          localStorage.setItem('volume-progress', this.volume.style.background);
          localStorage.setItem('volume-value', value);
        }
      }
    });
    this.getLocalStorage();
    this.volumeOff.onclick = () => {
      this.muteVolume();
    };
  }

  getLocalStorage() {
    let soundVolume = 0.4;
    if (localStorage.getItem('volume-progress')) soundVolume = localStorage.getItem('volume-value');
    this.volume.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${soundVolume * 100}%, #c4c4c4 ${
      soundVolume * 100
    }%, #c4c4c4 100%)`;
    this.arrSounds.forEach((sound) => {
      this.sound = sound;
      this.sound.volume = soundVolume;
      this.volume.value = soundVolume;
    });
    if (localStorage.getItem('this.volumeOff')) {
      this.volumeOff.classList.add('active');
      this.arrSounds.forEach((sound) => {
        this.sound = sound;
        this.sound.muted = true;
      });
    }
  }

  muteVolume() {
    this.arrSounds.forEach((sound) => {
      this.sound = sound;
      if (sound.muted) {
        this.volumeOff.classList.remove('active');
        localStorage.removeItem('this.volumeOff');
        this.sound.muted = false;
      } else {
        this.volumeOff.classList.add('active');
        localStorage.setItem('this.volumeOff', 'active');
        this.sound.muted = true;
      }
    });
  }

  playSound(audio) {
    this.audio = audio;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  getSound() {
    return [this.audioCorrect, this.audioClick, this.audioUncorrect];
  }
}

export default Sound;
