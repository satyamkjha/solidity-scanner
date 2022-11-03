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
    {src:"/carousel/Screenshot 1.png", alt:"View detailed scan result of your smart contracts on solidity scan"},
    {src:"/carousel/Screenshot 2.png", alt:"Find Bugs highlighted and pin pointed in your code for an easy fix on solidity scan"},
    {src:"/carousel/Screenshot 3.png", alt:"View, Manage and publish your reports and share it with your team on solidity scan"},
    {src:"/carousel/Screenshot 8.png", alt:"Easily manage your projects and scans on solidity scan"},
    {src: "/carousel/Screenshot 9.png", alt:"Integrate with Microsoft teams, Jira and Slack  on solidity scan"},
    {src: "/carousel/Screenshot 10.png", alt:"Scan your projects directly from github on solidity scan"},
    {src:"/carousel/Screenshot 11.png", alt:"Easily scan your blochain contract on solidity scan"},
    {src:"/carousel/Screenshot 12.png", alt:"Get a detailed view of issues in your project on solidity scan"},
    {src:"/carousel/Screenshot 13.png", alt:"Easily manage your scan histories on solidity scan"},
    // {src:"/carousel/Screenshot 13.png", alt:""},
  ];

  return (
    <Carousel plugins={["arrows", "infinite"]}>
      {imgSourceList.map((src) => <Image
        boxShadow="5px 5px 15px 15px #88888840"
        borderRadius="25px"
        src={src}
        margin="30px"
        width="90%"
      />)}
      
    </Carousel>
  );
};

export default ImageCarousel;
