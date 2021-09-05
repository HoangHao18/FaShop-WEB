import ImageProductSlider from "../../components/ImageProductSlider"
import './style.scss'
import Button from "../../components/MyButton"
import { getSingleProductAsync } from "../../redux/actions/productAction";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

export default function DetailsProduct(){

    let dispatch = useDispatch();

    let {id} = useParams();
    console.log("param: ", useParams())
    console.log("param id: ", id)
    useEffect(() => {
        dispatch(getSingleProductAsync(id));
    }, []);

    const product = useSelector((state) => state.products.productSingle);
    console.log("product now mmmmmmmmmmm: ",product)

    // useEffect(() => {
    //   if(categoryEdit){
    //       setFormData({
    //           name: categoryEdit.name,
    //           description: categoryEdit.description
    //       })
    //   }
    // }, [categoryEdit]);



    return(
        <div className="details-product-container">
            <div className="container">
                <div className="row">
                    <div className="col-6 details-product-left">
                        <ImageProductSlider/>
                    </div>
                    <div className="col-6 details-product-right">
                        <h3 className="title-dp">Thông tin sản phẩm</h3>
                        <p className="name-product-dp">Hoodie Xám Trơn</p>
                        <p className="code-product-dp">HO05</p>
                        <p className="price-dp">385.000 VND</p>
                        <div className="color-dp">
                            <p>Màu</p>
                            <div>
                                <div className="color-item-dp"></div>
                            </div>
                        </div>
                        <div className="size-dp">
                            <p>Kích thước</p>
                            <div>
                                <div className="size-item-dp choose-size">S</div>
                                <div className="size-item-dp">M</div>
                                <div className="size-item-dp">L</div>
                            </div>
                        </div>

                        <div className="quantity-dp">
                            <p>Số lượng</p>
                            <div className="quantity-btn-dp">
                                <span><i class='bx bx-minus icon-minus' ></i></span>
                                <span className="quantity">1</span>
                                <span><i class='bx bx-plus icon-plus'></i></span>
                            </div>
                        </div>
                        
                        <div className="nsx-dp">
                            Nhà sản xuất
                            <i class='bx bx-chevron-down icon-read-more'></i>
                        </div>
                        <p className="desc-dp">
                            Mô tả
                            <i class='bx bx-chevron-down icon-read-more'></i>
                        </p>
                        <div className="btn-dp">
                            <Button nameButton="Thêm Vào Giỏ Hàng"/>
                            <Button nameButton="Mua Hàng"/>
                        </div>
                    </div>
                </div>
            
            </div>
            
        </div>
    )
}