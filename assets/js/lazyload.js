const lazyLoad = (imageWrapper) => {
  const isCached = (src) => {
    var image = new Image();
    image.src = src;

    return image.complete;
  };
  const image = imageWrapper.querySelector("img");
  if (image.complete || isCached(image.src)) {
    imageWrapper.classList.add("ratioImage--complete");
  } else {
    console.log("load");
    image.onload = () => {
      imageWrapper.classList.add("ratioImage--loaded");
    };
  }
};

document.querySelectorAll(".ratioImage").forEach(lazyLoad);
