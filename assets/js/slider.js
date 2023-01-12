const slickSlider = document.querySelector(".slickSlider");
if (slickSlider) {
  $(slickSlider).slick({
    dots: true,
    slidesToShow: 2.5,
    slidesToScroll: 0.5,
    infinite: true,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          dots: true,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
