class ForecastCarousel {
  /* There is 40 forecast containers to 8 control buttons
      Current forecast index x Button control index
        [0, 1, 2, 3, 4]                 0
        [5, 6, 7, 8, 9]                 1
        [10, 11, 12, 13]                2
              ...                      ...
             index             Math.floor(index/5)

      Each button control is related to 5 forecast times */

  // Current forecast index, that is displayed on the first position
  #index;

  // A reference to the container of forecast containers
  #carousel;

  #controls;

  constructor(nextBtn, previousBtn, controls, carousel) {
    this.#index = 0;
    this.#carousel = carousel;

    // This reference is needed for #next and #previous methods
    this.#controls = controls.querySelectorAll('button');
    this.#controls[0].style.backgroundColor = 'rgba(217, 217, 217, 0.6)';

    nextBtn.addEventListener('click', () => this.#next());
    previousBtn.addEventListener('click', () => this.#previous());

    this.#controls.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        // Clear current control selected style
        this.#controls[this.#controlIndex()].style.backgroundColor =
          'rgba(217, 217, 217, 0.2)';
        this.#index = index * 5;

        // Add style to the selected control
        e.target.style.backgroundColor = 'rgba(217, 217, 217, 0.6)';

        // And move the carousel
        this.#carousel.style.right = `${15 * this.#index}vw`;
      });
    });
  }

  // This function convert the current index to an control index
  #controlIndex() {
    return Math.floor(this.#index / 5);
  }

  #next() {
    if (this.#index < this.#carousel.childElementCount - 5) {
      this.#index += 1;
      this.#carousel.style.right = `${15 * this.#index}vw`;

      // this will track the control index to toggle button color
      if (this.#index % 5 === 0) {
        this.#controls[this.#controlIndex() - 1].style.backgroundColor =
          'rgba(217, 217, 217, 0.2)';
        this.#controls[this.#controlIndex()].style.backgroundColor =
          'rgba(217, 217, 217, 0.6)';
      }
    }
  }

  #previous() {
    if (this.#index > 0) {
      this.#index -= 1;
      this.#carousel.style.right = `${15 * this.#index}vw`;

      // this will track the control index to toggle button color
      if (this.#index % 5 === 4) {
        this.#controls[this.#controlIndex() + 1].style.backgroundColor =
          'rgba(217, 217, 217, 0.2)';
        this.#controls[this.#controlIndex()].style.backgroundColor =
          'rgba(217, 217, 217, 0.6)';
      }
    }
  }
}

export default ForecastCarousel;
