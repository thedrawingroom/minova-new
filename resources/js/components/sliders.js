const prevArrow = `<button class="slick-arrow slick-arrow--prev"><i class="fa-regular fa-chevron-left fa-2x text-minova-gold absolute left-0 top-1/2 -translate-y-1/2 p-4"></i></button>`;
const nextArrow = `<button class="slick-arrow slick-arrow--next"><i class="fa-regular fa-chevron-right fa-2x text-minova-gold absolute right-0 top-1/2 -translate-y-1/2 p-4"></i></button>`;

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
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        rows: 0,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false,
              dots: true,
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
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false,
            },
          },
        ],
      });
    }
  },
};
