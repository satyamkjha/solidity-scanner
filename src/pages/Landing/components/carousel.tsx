import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Image } from "@chakra-ui/react";

const ImageCarousel = () => {
  const imgSourceList = [
    {
      src: "/carousel/Screenshot_1.png",
      alt: "View detailed scan result of your smart contracts on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_2.png",
      alt: "Find Bugs highlighted and pin pointed in your code for an easy fix on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_3.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_4.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_5.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_6.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_7.png",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_8.png",
      alt: "Easily manage your projects and scans on SolidityScan",
    },
  ];

  return (
    <Carousel plugins={["arrows"]}>
      {imgSourceList.map((src) => (
        <Image
          // boxShadow="5px 5px 15px 15px #88888840"
          // borderRadius="25px"
          src={src.src}
          alt={src.alt}
          // margin="30px"
          width="90%"
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
