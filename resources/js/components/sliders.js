const prevArrow = `<button type="button" class="slick-arrow slick-arrow--prev absolute content-[''] size-0 border-y-transparent border-y-[25px] border-r-white border-r-[40px] top-1/2 right-6 opacity-60"></button></button>`;
const nextArrow = `<button type="button" class="slick-arrow slick-arrow--next absolute content-[''] size-0 border-y-transparent border-y-[25px] border-l-white border-l-[40px] top-1/2 right-6 opacity-60"></button>`;

export default {
  init() {
    this.sliderProjectEl = $('.project-slider');
    this.sliderProductEl = $('.product-slider');

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

    if (this.sliderProductEl.length) {
      this.sliderProductEl.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '',
        nextArrow: nextArrow,
        rows: 0,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
              dots: true,
              arrows: false,
            },
          },
        ],
      });
    }
  },
};
