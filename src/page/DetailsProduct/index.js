import ImageProductSlider from "../../components/ImageProductSlider"
import './style.scss'
import Button from "../../components/MyButton"
import { getSingleProductAsync } from "../../redux/actions/productAction";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import NumberFormat from 'react-number-format';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowNext from './ArrowNext'
import ArrowPrev from './ArrowPrev'
import { toast } from "react-toastify";

const settings = {
    // dots: true,
    infinite: true,  
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    speed: 500,
    // autoplaySpeed: 3000,
    //fade: true,
    // cssEase: "linear",
    nextArrow: <ArrowNext/>,
    prevArrow: <ArrowPrev/>

}

export default function DetailsProduct(){
    const [isOpenDesc, setOpenDesc] = useState(false);

    let dispatch = useDispatch();

    const product = useSelector((state) => state.products.productSingle);
    console.log("product now mmmmmmmmmmm: ",product)

    const [colorsObject, setColorsObject] = useState([]);
    console.log("colorsObject: ", colorsObject);
    const [colorUserChoosed, setColorUserChoosed] = useState({color: "", sizes: []});
    const [sizeUserChoosed, setSizeUserChoosed] = useState({name: "", number: 0})
    const [numberUserChoosed, setNumberUserChoosed] = useState(0);

    let {id} = useParams();
    useEffect(() => {
        dispatch(getSingleProductAsync(id))
        .then(res => {
            console.log("okkkkkkkkk: ",res.ok )
            if(res.ok){
                setColorsObject(JSON.parse(res.productCurrent.colors))
                setColorUserChoosed(JSON.parse(res.productCurrent.colors)[0])
                setSizeUserChoosed(JSON.parse(res.productCurrent.colors)[0].sizes[0])
                //console.log("okkkkkkkkk: ",JSON.parse(res.productCurrent.colors)[0].sizes[0])
            }
        })
    }, []);


    const handleAddCart = ()=>{
        //console.log("user choose: ", colorUserChoosed, sizeUserChoosed,numberUserChoosed);
        if(numberUserChoosed == 0 ) return;
        const productAddCart = {
            ...product,
            colorChoosed: colorUserChoosed,
            sizeChoosed: sizeUserChoosed,
            numberChoosed: numberUserChoosed

        }
        let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = [...arrayCart,productAddCart];
        //console.log("testtttttt ",newCart)
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast.success("ADD CART SUCCESS")
    }

    return(
        <div className="details-product-container">
            {
                product ? 
        
            <div className="container">
                <div className="row">
                    <div className="col-6 details-product-left">
                        {/* <ImageProductSlider/> */}
                        <Slider {...settings}>
                            {
                                product.images && product.images.length > 0 ? 
                                product.images.map((item,index)=>
                                    <div><img src={process.env.REACT_APP_API_IMG + item}></img></div>
                                ) : <div>Null</div>
                            }    
                                
                        </Slider>
                    </div>
                    <div className="col-6 details-product-right">
                        <h3 className="title-dp">Thông tin sản phẩm</h3>
                        <p className="name-product-dp">{product.name}</p>
                        <p className="code-product-dp">{product.sku}</p>
                        <p className="price-dp"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} /> VND</p>
                        <div className="color-dp">
                            <p>Màu</p>
                                {
                                     colorsObject && colorsObject.map(function(color, index){
                                        if(color.color === colorUserChoosed.color){
                                            return(
                                                <div className="color-item-dp choosed"
                                                    style={{ backgroundColor: `${color.color}` }} 
                                                    key={index}
                                                    onClick={()=>{
                                                        setColorUserChoosed(color);
                                                    }}
                                                ></div> 
                                            )
                                        } 
                                        else{
                                            return(
                                                <div className="color-item-dp"
                                                    style={{ backgroundColor: `${color.color}` }} 
                                                    key={index}
                                                    onClick={()=>{
                                                        setColorUserChoosed(color);
                                                    }}
                                                 ></div> 
                                            )
                                        }
                                    }) 
                                }    
                            
                        </div>
                        <div className="size-dp">
                            <p>Kích thước</p>
                            <div>
                                {
                                     colorsObject && colorUserChoosed && colorUserChoosed.sizes.map(function(size, index){
                                        if(size.name === sizeUserChoosed.name){
                                            return(
                                                <div className="size-item-dp choose-size"  
                                                    key={index}
                                                    onClick={()=>{
                                                        setSizeUserChoosed(size)
                                                    }}
                                                >{size.name}</div> 
                                            )
                                        } else{
                                            return(
                                                <div className="size-item-dp"  
                                                    key={index}
                                                    onClick={()=>{
                                                        setSizeUserChoosed(size)
                                                    }}
                                                >{size.name}</div> 
                                            )
                                        }
                                    })    
                                }  
                            </div>
                        </div>

                        <div className="quantity-dp">
                            <p>Số lượng</p>
                            <div className="quantity-btn-dp">
                                <span onClick={()=>{setNumberUserChoosed( numberUserChoosed === 0 ? 0 : numberUserChoosed - 1)}}><i class='bx bx-minus icon-minus' ></i></span>
                                <span className="quantity">{numberUserChoosed}</span>
                                <span onClick={()=>{setNumberUserChoosed(numberUserChoosed == sizeUserChoosed.number ? numberUserChoosed : numberUserChoosed + 1)}}><i class='bx bx-plus icon-plus'></i></span>
                            </div>
                        </div>
                        
                        <div className="nsx-dp">
                            Nhà sản xuất :  {product.manufacture}
                            <i class='bx bx-chevron-down icon-read-more'></i>
                        </div>
                        <p className="desc-dp">
                            <div className="desc-dp-t">Mô tả </div>
                            {
                                isOpenDesc ? <i class='bx bx-chevron-up icon-read-more' onClick={()=>setOpenDesc(!isOpenDesc)}></i>
                                : <i class='bx bx-chevron-down icon-read-more' onClick={()=>setOpenDesc(!isOpenDesc)}></i>
                            }
                            
                        </p>
                            {
                                isOpenDesc && <div className="desc-more">{product.description}</div>
                            }

                        <div className="btn-dp">
                        <div onClick={()=>{handleAddCart()}} className="button-themgh">Thêm Vào Giỏ Hàng</div>
                            {/* <Button nameButton="Thêm Vào Giỏ Hàng" onClick={(event)=>{handleAddCart()}}/>
                            <Button nameButton="Mua Hàng"/> */}
                        </div>
                    </div>
                </div>
            
            </div>
            : <div>Loading...</div>
        }
        </div>
    )
}