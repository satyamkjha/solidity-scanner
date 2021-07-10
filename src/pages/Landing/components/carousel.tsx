import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const ImageCarousel = () => (
  <Carousel plugins={["arrows", "infinite"]}>
    <img src="/result-scrshot.jpg" />
    <img src="/home-scrshot.jpg" />
    <img src="/overview-scrshot.jpg" />
  </Carousel>
);

export default ImageCarousel;
