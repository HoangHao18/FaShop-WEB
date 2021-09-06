import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import ItemProductBuy from "../../components/ItemProductBuy";
import ImageProductSlider from "../../components/ImageProductSlider"
import Button from "../../components/MyButton";
import "./style.scss";
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginCheckLocalAsync } from "../../redux/actions/authAction";

export  default function Buy(){
    //San Pham
    let listProductCart = JSON.parse(localStorage.getItem("cart"));
    function calcTotalPriceCart(list){
        let t = 0;
        list.map(function(item,index){
             t = t + item.price*item.numberChoosed
        })
        console.log(t)
        return t;
    }
    const totalPriceProductBill = calcTotalPriceCart(listProductCart);
    const shipBill = 30000;
    const totalPriceBill = totalPriceProductBill + shipBill;

    //Nguoi Dat
    let dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector((state) => state.auth.userCurrent);
    //console.log("gggggg", userCurrent)
    useEffect(()=>{
        if(localStorage.getItem("isLogin") === "true"){
            dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])

    return(
        <div className="buy-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/slider01.jpg" title="Buy"/>
            <SeparatorBar/>
            <div className="row wrap">
            <div className="container-left col-7">
                <div className="row title-col">
                    <div className="col-5 name-col">
                        <h3>Sản Phẩm</h3>
                    </div>

                    <div className="col-2 price-col">
                        <h3>Giá</h3>
                    </div>

                    <div className="col-2 quantity-col">
                        <h3>Số Lượng</h3>
                    </div>

                    <div className="col-2 price-total-col">
                        <h3>Tổng Giá</h3>
                    </div>

                    <div className="col-1 button-col">
                        
                    </div>
                </div>

                <div className="list-product-cart">
                    {
                        listProductCart.map(function(item,index){
                            return(
                                <ItemProductBuy 
                                    img = {process.env.REACT_APP_API_IMG + item.images[0]}
                                    name = {item.name}
                                    price = {item.price}
                                    quantity = {item.numberChoosed}
                                    priceTotal = {item.price*item.numberChoosed}
                                    colorchoose ={item.colorChoosed.name}
                                    sizechoose ={item.sizeChoosed.name}
                                />
                            ) 
                        })
                    }
                </div>

               <div className="row total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price"><NumberFormat value={totalPriceProductBill}  displayType={'text'} thousandSeparator={true} /> VND</span>
                    </div>
               </div>

               {/* <div className="row btn">
                   <div className="btn-item">
                        <Button nameButton="Tiếp tục mua hàng"/>
                   </div>
                    
                   <div className="btn-item">
                        <Button nameButton="Đặt Hàng"/>
                   </div>
               </div> */}
            </div>

            <div className="container-right col-5">
               <h3 className="title-cr">Địa chỉ giao hàng</h3>
               <form className="form-buy-info">
                    <div className="form-group">
                        <label className="label">Tên người nhận hàng<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            value={userCurrent.name}
                        />      
                    </div>
                    <div className="form-group">
                        <label className="label">Địa chỉ nhận hàng<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            value={userCurrent.address}
                        />      
                    </div>
                    <div className="form-group">
                        <label className="label">Số điện thoại liên lạc<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            value={userCurrent.phone}
                        />      
                    </div>
                    <div className="form-group">
                        <label className="label">Lưu ý với người bán</label>
                        <input id="name" type="text" className="form-control bac" placeholder=""/>   
                        
                    </div>
                </form>
                <h3 className="title-cr">Thông tin đơn hàng</h3>
                <div className="row">
                    <div className="col-6 type">Phí giao hàng: </div>
                    <div className="col-6 number"><NumberFormat value={shipBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                <div className="row">
                    <div className="col-6 type">Tổng tiền hàng: </div>
                    <div className="col-6 number"><NumberFormat value={totalPriceProductBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                <div className="row total-bill">
                    <div className="col-6 type">Tổng cộng: </div>
                    <div className="col-6 number"><NumberFormat value={totalPriceBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                
                <div className="row btn-dat-hang">
                    <Button nameButton="Đặt Hàng"/>
                </div>
            </div >

            </div>
           
            <SeparatorBar/>
        </div>
    );
}