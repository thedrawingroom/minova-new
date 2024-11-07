import { prevArrowLarge, nextArrowLarge } from '../includes/arrows';

export default {
  init() {
    this.sliderProjectEl = $('.project-slider');
    this.sliderProductEl = $('.product-slider');

    $('.accordion-control').on('click', () => {
      setTimeout(() => {
        $(window).trigger('resize');
      }, 100);
    });

    window.addEventListener('resize', () => {
      $('.slick-slider').each(function () {
        $(this).slick('resize');
      });
    });

    if (this.sliderProjectEl.length) {
      this.sliderProjectEl.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: prevArrowLarge,
        nextArrow: nextArrowLarge,
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
        slidesToScroll: 5,
        arrows: true,
        dots: false,
        prevArrow: prevArrowLarge,
        nextArrow: nextArrowLarge,
        rows: 0,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            },
          },
        ],
      });
    }
  },
};
