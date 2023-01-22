const slickSlider = document.querySelector(".slickSlider");
if (slickSlider) {
  $(slickSlider).slick({
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    infinite: true,
    responsive: [
      {
        breakpoint: 1360,
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
        breakpoint: 840,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  });

  $(slickSlider).on("setPosition", () => {
    slickSlider
      .querySelectorAll(".ratioImage:not(.ratioImage--loaded)")
      .forEach(lazyLoad);
  });
}
