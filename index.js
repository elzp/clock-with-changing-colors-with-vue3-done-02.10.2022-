import { createApp } from 'vue';
import colors from './colors';

const lengthOfColors = colors.length;

const app = createApp({
  data() {
    const date = new Date();
    const numberToString = (number) => {
      let result = number.toString().length == 1 ? `0${number}` : `${number}`;
      return result;
    };
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      displayhours: this.numberToString(date.getHours()),
      displayminutes: this.numberToString(date.getMinutes()),
      displayseconds: this.numberToString(date.getSeconds()),
      nIntervId: '',
      colorInterval: '',
      numberOfCurrentColor: 0,
      backgroundColor: colors[0].color,
    };
  },
  methods: {
    numberToString(number) {
      let result = number.toString().length == 1 ? `0${number}` : `${number}`;
      return result;
    },

    changeColor() {
      if (this.numberOfCurrentColor < lengthOfColors + 1) {
        this.numberOfCurrentColor += 1;
      } else {
        this.numberOfCurrentColor = 0;
      }
      this.backgroundColor = colors[this.numberOfCurrentColor].color;
    },
    startCounting() {
      // check if an interval has already been set up
      if (this.nIntervId === '') {
        this.nIntervId = setInterval(() => {
          this.seconds += 1;
          if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes += 1;
            this.displayminutes = this.numberToString(this.minutes);
          }
          if (this.minutes === 60) {
            this.minutes = 0;
            this.hours += 1;
            this.displayminutes = this.numberToString(this.minutes);
            this.displayhours = this.numberToString(this.hours);
          }
          if (this.hours === 24) {
            this.hours = 0;
            this.displayhours = this.numberToString(this.hours);
            this.minutes = 0;
            this.displayminutes = this.numberToString(this.minutes);
          }
          this.displayseconds = this.numberToString(this.seconds);

          if (this.seconds % 10 === 0) {
            this.changeColor();
          }
        }, 1000);
      }
    },
    stopCounting() {
      clearInterval(this.nIntervId);
      clearInterval(this.colorInterval);
      // release our intervalID from the variable
      this.nIntervId = null;
      this.colorInterval = null;
    },
  },
  mounted() {
    this.startCounting();
  },
  beforeDestroy() {
    this.stopCounting();
  },
});

app.mount('#app');
