import SeparatorBar from "../../../SeparatorBar";
import ItemProductBuy from "../../../ItemProductBuy";
import "./style.scss";
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useEffect, useState } from 'react';
import { getSingleOrderAsync } from "../../../../redux/actions/orderAction";
import { getSignUserAsync } from "../../../../redux/actions/userAction";
import { useParams } from "react-router";

export  default function EditOrder(){
    // //San Pham
    // let listProductCart = JSON.parse(localStorage.getItem("cart"));
    // function calcTotalPriceCart(list){
    //     let t = 0;
    //     list.map(function(item,index){
    //          t = t + item.price*item.numberChoosed
    //     })
    //     console.log(t)
    //     return t;
    // }
    // const totalPriceProductBill = calcTotalPriceCart(listProductCart);
    // const shipBill = 30000;
    // const totalPriceBill = totalPriceProductBill + shipBill;

    // //Nguoi Dat
    // let dispatch = useDispatch();
    // const isLogin = useSelector((state) => state.auth.isLogin);
    // const userCurrent = useSelector((state) => state.auth.userCurrent);
    // const infoUserOder = {...userCurrent};
    // useEffect(()=>{
    //     if(localStorage.getItem("isLogin") === "true"){
    //         dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
    //     }
    // },[])

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
        <div className="edit-container">
            <div className="header-order-bill">
                <div>M?? ????n h??ng: {orderCurrent.code}</div>
                {
                    orderCurrent.createdAt ? 
                    <div>Ng??y ?????t: {(new Date(orderCurrent.createdAt)).toISOString().slice(0,10)}</div> : ''
                }
                
                <div>Tr???ng th??i: {orderCurrent.status}</div>
            </div>

            <div className="row top-container">           
                <div className="col-4 top-left">
                    <h3 className="title-cr">T??i kho???n ?????t h??ng</h3>
                    {
                    accountUserOrder ?
                        <form className="form-account-info">
                            <div className="form-group">
                                <label className="label">ID t??i kho???n<span className="icon-s">*</span></label>
                                <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={accountUserOrder._id}
                                />      
                            </div>
                            <div className="form-group">
                                <label className="label">T??n t??i kho???n<span className="icon-s">*</span></label>
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
                    <h3 className="title-cr">Th??ng tin nh???n h??ng</h3>
                    <form className="form-bill-info">
                        <div className="form-group">
                            <label className="label">T??n ng?????i nh???n h??ng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.name}
                            />      
                        </div>
                        <div className="form-group">
                            <label className="label">?????a ch??? nh???n h??ng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.address}
                            />     
                        </div>
                        <div className="form-group">
                            <label className="label">S??? ??i???n tho???i li??n l???c<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.phone}
                            /> 
                        </div>
                        <div className="form-group">
                            <label className="label">L??u ?? v???i ng?????i b??n</label>
                            <input id="name" type="text" className="form-control bac" placeholder="" disabled
                                defaultValue={orderCurrent.note} 
                            />   
                            
                        </div>
                    </form>

                    <h3 className="title-cr">Th??ng tin ????n h??ng</h3>
                    <div className="row all-row">
                        <div className="col-6 type">Ph?? giao h??ng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.ship}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row all-row">
                        <div className="col-6 type">T???ng ti???n h??ng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.price_total }  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row all-row total-bill">
                        <div className="col-6 type">T???ng c???ng: </div>
                        <div className="col-6 number"><NumberFormat value={orderCurrent.price_total + orderCurrent.ship}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                </div >
            </div>

            <div className="bottom-container">
                <h3 className="title-cr">Chi ti???t s???n ph???m</h3>
                <div className="row title-col">
                    <div className="col-5 name-col">
                        <h3>S???n Ph???m</h3>
                    </div>

                    <div className="col-2 price-col">
                        <h3>Gi??</h3>
                    </div>

                    <div className="col-2 quantity-col">
                        <h3>S??? L?????ng</h3>
                    </div>

                    <div className="col-2 price-total-col">
                        <h3>T???ng Gi??</h3>
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
                        <span className="bill-title">T???ng : </span>
                        <span className="bill-price"><NumberFormat value={orderCurrent.price_total}  displayType={'text'} thousandSeparator={true} /> VND</span>
                    </div>
                </div>
            </div>
           
            <SeparatorBar/>
        </div>
    );
}