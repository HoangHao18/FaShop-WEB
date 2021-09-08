import SeparatorBar from "../../../components/SeparatorBar";

import "./style.scss";
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useEffect, useState } from 'react';
import { getSingleOrderAsync } from "../../../redux/actions/orderAction";
import { getSignUserAsync } from "../../../redux/actions/userAction";
import { useParams } from "react-router";
import ItemProductBuy from "../../../components/ItemProductBuy";

export  default function GuestOrderDetail(){

    let dispatch = useDispatch();
    let {id} = useParams();

    const orderCurrent = useSelector(state => state.orders.orderSingle);
    const accountUserOrder = useSelector(state => state.users.userSingle);
    const isLoadingOrder = useSelector(state => state.orders.isLoading);
    const isLoadingAccont = useSelector(state => state.users.isLoading);
    const [productOrderList, setProductOrderList] = useState([]);

    useEffect(()=>{
        dispatch(getSingleOrderAsync(id))
        .then(res =>{
            if(res.ok){
                setProductOrderList(JSON.parse(res.orderCurrent.productlist))
                dispatch(getSignUserAsync(res.orderCurrent.iduseroder))
                console.log("chay may lan 444444444444444444")
            }
        })
        
    },[])

    // useEffect(()=> {
    //     if(orderCurrent){
    //         setProductOrderList(JSON.parse(orderCurrent.productlist))
    //         dispatch(getSignUserAsync(res.orderCurrent.iduseroder))
    //         console.log("chay may lan 55555555555555555555 if")
    //     }
      
    //     console.log("chay may lan 55555555555555555555")
    // },[orderCurrent])


    return(
        // isLoadingAccont && isLoadingOrder && orderCurrent ? <div>Loading...</div> :
        <div className="guest-order-detail-container">
            <div className="header-order-bill">
                <div>Mã đơn hàng: {orderCurrent.code}</div>
                {
                    orderCurrent.createdAt ? 
                    <div>Ngày đặt: {(new Date(orderCurrent.createdAt)).toISOString().slice(0,10)}</div> : ''
                }
                
                <div>Trạng thái: {orderCurrent.status}</div>
            </div>

            <div className="row top-container">           
                <div className="col-4 top-left">
                    <h3 className="title-cr">Tài khoản đặt hàng</h3>
                    {
                    accountUserOrder ?
                        <form className="form-account-info">
                            {/* <div className="form-group">
                                <label className="label">ID tài khoản<span className="icon-s">*</span></label>
                                <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={accountUserOrder._id}
                                />      
                            </div> */}
                            <div className="form-group">
                                <label className="label">Tên tài khoản<span className="icon-s">*</span></label>
                                <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                    defaultValue={accountUserOrder.name}
                                />     
                            </div>
                            <div className="form-group">
                                <label className="label">Email<span className="icon-s">*</span></label>
                                <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                    defaultValue={accountUserOrder.email}
                                /> 
                            </div>
                        </form> : ''
                    }
                </div>
                       
            <div className="col-8 top-right">
                    <h3 className="title-cr">Thông tin nhận hàng</h3>
                    <form className="form-bill-info">
                        <div className="form-group">
                            <label className="label">Tên người nhận hàng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.name}
                            />      
                        </div>
                        <div className="form-group">
                            <label className="label">Địa chỉ nhận hàng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.address}
                            />     
                        </div>
                        <div className="form-group">
                            <label className="label">Số điện thoại liên lạc<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.phone}
                            /> 
                        </div>
                        <div className="form-group">
                            <label className="label">Lưu ý với người bán</label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.note} 
                            />   
                            
                        </div>
                    </form>

                    <h3 className="title-cr">Thông tin đơn hàng</h3>
                    <div className="row all-row">
                        <div className="col-6 type">Phí giao hàng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.ship}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row all-row">
                        <div className="col-6 type">Tổng tiền hàng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.price_total }  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row all-row total-bill">
                        <div className="col-6 type">Tổng cộng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.price_total + orderCurrent.ship}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                </div >
            </div>

            <div className="bottom-container">
                <h3 className="title-cr">Chi tiết sản phẩm</h3>
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
                        
                        productOrderList.map(function(item,index){
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
                <div className="total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price"><NumberFormat value={orderCurrent.price_total}  displayType={'text'} thousandSeparator={true} /> VND</span>
                    </div>
                </div>
            </div>
           
            <SeparatorBar/>
        </div>
    );
}