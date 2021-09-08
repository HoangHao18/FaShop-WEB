
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByUserIdAsync } from '../../../redux/actions/orderAction';
import './style.scss'



export default function GuestOrders(){
    const demo = {
        code : "DH0001",
        createdAt: "2021-09-07T10:23:45.937+00:00",
        ship: 30000,
        price_total: 300000,
        status: "CHo",
    }
    const OrdersGustItem = (item) => {
        return(
            <div className="order-gust-item-container">
                <div className="row ">
                    <div className="col item-ogit">{item.code} </div>
                    <div className="col item-ogit">{item.name} </div>
                    <div className="col item-ogit">{(new Date(item.createdAt)).toISOString().slice(0,10)} </div>
                    <div className="col item-ogit"><NumberFormat value={item.ship}  displayType={'text'} thousandSeparator={true} /> VND </div>
                    <div className="col item-ogit"><NumberFormat value={item.price_total}  displayType={'text'} thousandSeparator={true} /> VND </div>
                    <div className="col item-ogit"><NumberFormat value={item.price_total + item.ship}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    <div className="col item-ogit"><span className="done">{item.status}</span></div>
                    <div className="col item-ogit last" onClick={()=>handleEdit(item._id)}><span><i class='bx bx-link-external iconEdit'></i></span></div>   
                       
                </div>
            </div>
        )
    }

    let history = useHistory();
    const handleEdit = (orderId) => {
        history.push(`/order/${orderId}`);
    }

    /////////////
    const ordersOfUser = useSelector((state) => state.orders.ordersOfUser);
    let {id} = useParams();
    let dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getOrdersByUserIdAsync(id));
    },[])

    return(
        <div className="gust-orders-container">
            <h3 className="title">Danh sách đơn hàng</h3>
            <div className="row header-row">
                <div className="col">Mã ĐH</div>
                <div className="col">Tên Người Nhận</div>
                <div className="col">Ngày Đặt</div>
                <div className="col">Phí Giao Hàng</div>
                <div className="col">Tổng Tiền hàng</div>
                <div className="col">Tổng Hóa Đơn</div>
                <div className="col">Trạng Thái</div>
                <div className="col"></div>
                {/* <div className="col" onClick={()=>handleEdit(item._id)}><span><i class='bx bx-edit-alt iconEdit'> </i></span></div>            */}
            </div>

            <div className="orders-list-container">
                {
                    ordersOfUser ? ordersOfUser.map((item,index) =>
                        OrdersGustItem(item)
                    )
                    : <div></div>
                }
            </div>

        </div>
    )
}