const prevArrowProject = `
<button class="slick-arrow slick-arrow--prev absolute left-0 top-1/2 -translate-y-1/2 text-3xl 3xl:text-5xl px-3 inline-block">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 192 192"
    class="size-10 rotate-180"
  >
    <polygon
      class="fill-minova-gold"
      points="17.74 14.43 11.06 28.16 159.02 94.54 12.54 163.88 19.23 177.6 180.9 101.21 180.9 88.6 17.74 14.43"
    />
  </svg>
</button>`;

const nextArrowProject = `
<button class="slick-arrow slick-arrow--next absolute right-0 top-1/2 -translate-y-1/2 text-3xl 3xl:text-5xl px-3 inline-block">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 192 192"
    class="size-10"
  >
    <polygon
      class="fill-minova-gold"
      points="17.74 14.43 11.06 28.16 159.02 94.54 12.54 163.88 19.23 177.6 180.9 101.21 180.9 88.6 17.74 14.43"
    />
  </svg>
</button>`;

const prevArrowInvert =
  '<button class="slick-arrow slick-arrow--prev absolute left-0 top-1/2 -translate-y-1/2 text-3xl 3xl:text-5xl px-3 inline-block"><i class="fa-regular fa-chevron-left text-white"></i></button>';
const nextArrowInvert =
  '<button class="slick-arrow slick-arrow--next absolute right-0 top-1/2 -translate-y-1/2 text-3xl 3xl:text-5xl px-3 inline-block"><i class="fa-regular fa-chevron-right text-white"></i></button>';

export default {
  init() {
    this.sliderProjectEl = $('.project-slider');
    this.sliderProductEl = $('.product-slider');

    $('.accordion-control').on('click', () => {
      $(window).trigger('resize');
    });

    addEventListener('resize', function () {
      $('.slick-slider').slick('resize');
    });

    if (this.sliderProjectEl.length) {
      this.sliderProjectEl.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: prevArrowProject,
        nextArrow: nextArrowProject,
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
        prevArrow: prevArrowInvert,
        nextArrow: nextArrowInvert,
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
