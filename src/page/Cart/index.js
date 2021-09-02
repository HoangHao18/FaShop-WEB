import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import ItemProductCart from "../../components/ItemProductCart";
import ImageProductSlider from "../../components/ImageProductSlider"
import Button from "../../components/MyButton";
import "./style.scss";

export  default function Cart(){
    return(
        <div className="cart-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/slider01.jpg" title="Cart"/>
            <SeparatorBar/>
            <div className="container">
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
                    <ItemProductCart 
                        img = "/assets/images/len2.png"
                        name = "Áo Cadigan Len Xanh"
                        price = "495.000"
                        quantity = "1"
                        priceTotal = "495.000"
                    />
                    <ItemProductCart 
                        img="/assets/images/ho08.png"
                        name = "Hoodie Bear Grey"
                        price = "380.000"
                        quantity = "1"
                        priceTotal = "380.000"
                    />

                    {/* <ImageProductSlider/> */}
                </div>

               <div className="row total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price">875.000 VND</span>
                    </div>
               </div>

               <div className="row btn">
                   <div className="btn-item">
                        <Button nameButton="Tiếp tục mua hàng"/>
                   </div>
                    
                   <div className="btn-item">
                        <Button nameButton="Đặt Hàng"/>
                   </div>
               </div>


            </div>
            <SeparatorBar/>
        </div>
    );
}