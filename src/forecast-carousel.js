class ForecastCarousel {
    /*There is 40 forecast containers to 8 control buttons
      Current forecast index x Button control index 
        [0, 1, 2, 3, 4]                 0
        [5, 6, 7, 8, 9]                 1
        [10, 11, 12, 13]                2
              ...                      ...
             index             Math.floor(index/5)

      Each button control is related to 5 forecast times*/

    #index; //Current forecast index, that is displayed on the first position 
    #carousel; //A reference to the container of forecast containers
    #controls;
    constructor(nextBtn, previousBtn, controls, carousel) {
        this.#index = 0;
        this.#carousel = carousel;
        this.#controls = controls; //This reference is needed for #next and #previous methods
        controls[0].style.backgroundColor = 'rgba(217, 217, 217, 0.6)';

        nextBtn.addEventListener('click', () => this.#next());
        previousBtn.addEventListener('click', () => this.#previous());

        controls.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                this.#controls[this.#controlIndex()].style.backgroundColor = 'rgba(217, 217, 217, 0.2)'; //Clear current control selected style
                this.#index = index*5;
                e.target.style.backgroundColor = 'rgba(217, 217, 217, 0.6)'; //Add style to the selected control
                this.#carousel.style.right = `${15*this.#index}vw`; //And move the carousel
            });
        });

    }

    #controlIndex() { //This function convert the current index to an control index
        return Math.floor(this.#index/5);
    }

    #next() {    
        if(this.#index < this.#carousel.childElementCount-5) {
            this.#index++;
            this.#carousel.style.right = `${15*this.#index}vw`;
            if(this.#index % 5 == 0) { //this will track the control index to toggle button color
                console.log(this.#controls[this.#controlIndex()]);
                this.#controls[this.#controlIndex()-1].style.backgroundColor = 'rgba(217, 217, 217, 0.2)';
                this.#controls[this.#controlIndex()].style.backgroundColor = 'rgba(217, 217, 217, 0.6)';
            }
        }
    }

    #previous() {
        if (this.#index > 0) {
            this.#index--;
            this.#carousel.style.right = `${15*this.#index}vw`;
            if(this.#index % 5 == 4) { //this will track the control index to toggle button color
                console.log(this.#controls[this.#controlIndex()]);
                this.#controls[this.#controlIndex()+1].style.backgroundColor = 'rgba(217, 217, 217, 0.2)';
                this.#controls[this.#controlIndex()].style.backgroundColor = 'rgba(217, 217, 217, 0.6)';
            }
        }
    }

}

export default ForecastCarousel;