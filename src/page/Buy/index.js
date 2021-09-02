import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import ItemProductBuy from "../../components/ItemProductBuy";
import ImageProductSlider from "../../components/ImageProductSlider"
import Button from "../../components/MyButton";
import "./style.scss";

export  default function Buy(){
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
                    <ItemProductBuy
                        img = "/assets/images/len2.png"
                        name = "Áo Cadigan Len Xanh"
                        price = "495.000"
                        quantity = "1"
                        priceTotal = "495.000"
                    />
                    <ItemProductBuy
                        img="/assets/images/ho08.png"
                        name = "Hoodie Bear Grey"
                        price = "380.000"
                        quantity = "1"
                        priceTotal = "380.000"
                    />

                    {/* <ImageProductSlider/> */}
                </div>

               {/* <div className="row total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price">875.000 VND</span>
                    </div>
               </div> */}

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
                        <input id="name" type="text" className="form-control bac" placeholder=""/>      
                    </div>
                    <div className="form-group">
                        <label className="label">Địa chỉ nhận hàng<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""/>      
                    </div>
                    <div className="form-group">
                        <label className="label">Số điện thoại liên lạc<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""/>      
                    </div>
                    <div className="form-group">
                        <label className="label">Lưu ý với người bán</label>
                        <input id="name" type="text" className="form-control bac" placeholder=""/>   
                        
                    </div>
                </form>
                <h3 className="title-cr">Thông tin đơn hàng</h3>
                <div className="row">
                    <div className="col-6 type">Phí giao hàng: </div>
                    <div className="col-6 number">30.000VND</div>
                </div>
                <div className="row">
                    <div className="col-6 type">Tổng tiền hàng: </div>
                    <div className="col-6 number">875.000VND</div>
                </div>
                <div className="row total-bill">
                    <div className="col-6 type">Tổng cộng: </div>
                    <div className="col-6 number">905.000VND</div>
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