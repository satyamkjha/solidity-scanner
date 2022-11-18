import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Image } from "@chakra-ui/react";

const ImageCarousel = () => {
  const styleObject = {
    boxShadow: "5px 5px 15px 15px #88888840",
    borderRadius: "25px",
    margin: "30px",
    width: "90%",
  };

  const imgSourceList = [
    {
      src: "/carousel/Screenshot_1.jpg",
      alt: "View detailed scan result of your smart contracts on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_2.jpg",
      alt: "Find Bugs highlighted and pin pointed in your code for an easy fix on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_3.jpg",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_4.jpg",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_5.jpg",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_6.jpg",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_7.jpg",
      alt: "View, Manage and publish your reports and share it with your team on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_8.jpg",
      alt: "Easily manage your projects and scans on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_9.jpg",
      alt: "Integrate with Microsoft teams, Jira and Slack  on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_10.jpg",
      alt: "Scan your projects directly from github on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_11.jpg",
      alt: "Easily scan your blochain contract on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_12.jpg",
      alt: "Get a detailed view of issues in your project on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_13.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_14.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_15.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_16.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_17.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_18.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    {
      src: "/carousel/Screenshot_19.jpg",
      alt: "Easily manage your scan histories on SolidityScan",
    },
    // {src:"/carousel/Screenshot_13.jpg", alt:""},
  ];

  return (
    <Carousel plugins={["arrows", "infinite"]}>
      {imgSourceList.map((src) => (
        <Image
          boxShadow="5px 5px 15px 15px #88888840"
          borderRadius="25px"
          src={src.src}
          alt={src.alt}
          margin="30px"
          width="90%"
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
