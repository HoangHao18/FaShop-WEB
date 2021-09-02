import React, { Component } from "react";
import Slider from "react-slick";
import './style.scss'
//import { baseUrl } from "./config";

const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={`/assets/images/hh0${i + 1}.jpg`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

const settings2 = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  customPaging:  (i) => {
    return <div>
      <img
        src={srcImageArray[i]}
        alt=""
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    </div>;
  },
  dotsClass: "slick-dots custom-indicator"
};

const srcImageArray = ["/assets/images/hh01.jpg", "/assets/images/hh02.jpg", "/assets/images/hh03.jpg","/assets/images/hh04.jpg"];

export default function ImageProductSlider() {
    return (
      <div className="image-product-slider-container">
        {/* <h2>Custom Paging</h2> */}
        <Slider {...settings2}>
          {
            srcImageArray.map(
              item=>(
                <div>
                  <img src={item}></img>
                </div>
              )
            )
          }
        </Slider>
      </div>
    );
}