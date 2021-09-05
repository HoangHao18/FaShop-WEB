import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import FeaturedProduct from "../FeaturedProduct";
import ArrowNext from './ArrowNext'
import ArrowPrev from './ArrowPrev'

import { ChevronBackOutline, ChevronForwardOutline } from 'react-ionicons'
import Item from "../Item";

import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import { getListProductsAsync } from "../../redux/actions/productAction";

function Arrow(){
    return(
        <div className="arrow-slick">&gt;</div>
    )
}



const settings = {
    // dots: true,
    infinite: true,  
    slidesToShow: 4,
    slidesToScroll: 2,
    //autoplay: true,
    speed: 500,
    // autoplaySpeed: 3000,
    //fade: true,
    // cssEase: "linear",
    nextArrow: <ArrowNext/>,
    prevArrow: <ArrowPrev/>

}

export default function FPSlider({isLoading, productList}){
    // let dispatch = useDispatch();
    // const productList = useSelector((state) => state.products.productList);
    // const isLoading = useSelector(state => state.products.isLoading)
    // console.log("productList",productList,"isloading", isLoading);

    // useEffect(() => {
    //     dispatch(getListProductsAsync());
       
    // }, []);

    // let history = useHistory();
    const [productListRender, setProductListRender] = useState(productList);
    const [isLoadingRender, setIsLoadingRender] =useState (isLoading)   
    useEffect(()=>{
        setProductListRender(productList)
        console.log("please",productListRender)
    },[productList])

    useEffect(()=>{
        setIsLoadingRender(isLoading)
        console.log("please",productListRender)
    },[isLoading])

    return (
        <div className="FPSlider">
          <Slider {...settings}>
                {
                    isLoadingRender ? <div>Loading...</div> :
                    (
                        productListRender && productListRender.length > 0 ? (
                             
                            productListRender.map((item, index) => 
                                <div key={index}>
                                    <FeaturedProduct image={process.env.REACT_APP_API_IMG + item.images[0]}
                                        name = {item.name}
                                        price = {item.price}/>
                                </div> 
                            )
                            
                        ) : <div>Not Have Product</div>
                    )                           
                }
           
            <div>
                <FeaturedProduct image="/assets/images/ho08.png"
                    name = "Hoodie Bear Grey"
                    price = "380.000"/>
            </div>
            <div>
                <FeaturedProduct image="/assets/images/classic02.png"
                    name = "Đầm Maxi Trắng"
                    price = "420.000"/>
            </div>
            <div>
                <FeaturedProduct image="/assets/images/chanvayC.jpg"
                    name = "Chân váy Caro"
                    price = "480.000"/>
            </div>
             {/*<div>
                <FeaturedProduct image="/assets/images/sw08.png"
                    name = "Sweater Bubble White"
                    price = "355.000"/>
            </div>
            <div>
                <FeaturedProduct image="/assets/images/sw02.png"
                    name = "Sweater Grey"
                    price = "380.000"/>
            </div>
           
            <div>
                <FeaturedProduct image="/assets/images/slider02.jpg"
                    name = ""
                    price = ""/>
            </div> */}
          </Slider>
        </div>
      );
}