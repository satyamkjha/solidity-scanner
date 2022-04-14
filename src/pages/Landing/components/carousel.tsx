import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const ImageCarousel = () => {

const styleObject = {
  boxShadow: '5px 5px 15px 15px #88888840',
  borderRadius: '25px',
  margin: '30px',
  width: '90%'
}

return (
  <Carousel plugins={["arrows", "infinite"]}>
    <img style={styleObject} src="/carousel/Screenshot 1.png" />
    <img style={styleObject} src="/carousel/Screenshot 2.png" />
    <img style={styleObject} src="/carousel/Screenshot 3.png" />
    <img style={styleObject} src="/carousel/Screenshot 4.png" />
    <img style={styleObject} src="/carousel/Screenshot 5.png" />
    <img style={styleObject} src="/carousel/Screenshot 6.png" />
    <img style={styleObject} src="/carousel/Screenshot 7.png" />
    <img style={styleObject} src="/carousel/Screenshot 8.png" />
    <img style={styleObject} src="/carousel/Screenshot 9.png" />
    <img style={styleObject} src="/carousel/Screenshot 10.png" />
    <img style={styleObject} src="/carousel/Screenshot 11.png" />
    <img style={styleObject} src="/carousel/Screenshot 12.png" />
    <img style={styleObject} src="/carousel/Screenshot 13.png" />
    <img style={styleObject} src="/carousel/Screenshot 14̀.png" />
  </Carousel>
  
)};

export default ImageCarousel;
