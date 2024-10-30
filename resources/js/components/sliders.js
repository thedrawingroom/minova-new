const prevArrow = `<button type="button" class="slick-arrow slick-arrow--prev absolute content-[''] size-0 border-y-transparent border-y-[25px] border-r-white border-r-[40px] top-1/2 right-6 opacity-60"></button></button>`;
const nextArrow = `<button type="button" class="slick-arrow slick-arrow--next absolute content-[''] size-0 border-y-transparent border-y-[25px] border-l-white border-l-[40px] top-1/2 right-6 opacity-60"></button>`;

export default {
  init() {
    this.sliderProjectEl = $('.project-slider');
    addEventListener('resize', function () {
      $('.slick-slider').slick('resize');
    });

    if (this.sliderProjectEl.length) {
      this.sliderProjectEl.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '',
        nextArrow: nextArrow,
        rows: 0,
        fade: true,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              autoplay: true,
              adaptiveHeight: true,
            },
          },
        ],
      });
    }
  },
};
