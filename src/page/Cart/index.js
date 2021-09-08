// import HeaderBar from "../../components/HeaderBar";
// import HeaderImage from "../../components/HeaderImage";
// import SeparatorBar from "../../components/SeparatorBar";
// import ItemProductCart from "../../components/ItemProductCart";
// import ImageProductSlider from "../../components/ImageProductSlider"
// import Button from "../../components/MyButton";
// import "./style.scss";
// import { useEffect, useState } from "react";
// import NumberFormat from 'react-number-format';

// export  default function Cart(){
//     let listProductCart = JSON.parse(localStorage.getItem("cart"));
//     const [totalPriceCart, setTotalPriceCart] = useState(calcTotalPriceCart());
//     const [quantityProductCart, setQuantityProductCart] = useState(listProductCart.numberChoosed)
//     const [listProductCartA, setListProductCartA] = useState(listProductCart)
//     function calcTotalPriceCart(){
//         let t = 0;
//         listProductCart.map(function(item,index){
//              t = t + item.price*item.numberChange
//         })
//         console.log(t)
//         return t;
//     }
//    useEffect(()=>{
//     setTotalPriceCart( calcTotalPriceCart())
//    },[])
//     return(
//         listProductCart.length > 0 ?
//         <div className="cart-container">
//             <HeaderBar/>
//             <HeaderImage img= "/assets/images/slider01.jpg" title="Cart"/>
//             <SeparatorBar/>
//             <div className="container">
//                 <div className="row title-col">
//                     <div className="col-5 name-col">
//                         <h3>Sản Phẩm</h3>
//                     </div>

//                     <div className="col-2 price-col">
//                         <h3>Giá</h3>
//                     </div>

//                     <div className="col-2 quantity-col">
//                         <h3>Số Lượng</h3>
//                     </div>

//                     <div className="col-2 price-total-col">
//                         <h3>Tổng Giá</h3>
//                     </div>

//                     <div className="col-1 button-col">
                        
//                     </div>
//                 </div>

//                 <div className="list-product-cart">
//                     {
//                         listProductCartA.map(function(item,index){
//                             //setTotalPriceCart(totalPriceCart + item.price)
//                             return(
//                                 <ItemProductCart 
//                                 img = {process.env.REACT_APP_API_IMG + item.images[0]}
//                                 name = {item.name}
//                                 color = {item.colorChoosed.name}
//                                 size = {item.sizeChoosed.name}
//                                 price = {item.price}
//                                 quantity = {item.numberChoosed}
//                                 numberChange = {item.numberChoosed}
                               
//                             />
//                             ) 
//                         })
//                     }
                  
//                 </div>

//                <div className="row total-price-bill">
//                     <div className="bill-border">
//                         <span className="bill-title">Tổng : </span>
//                         <span className="bill-price"><NumberFormat value={totalPriceCart} displayType={'text'} thousandSeparator={true} /></span>
//                     </div>
//                </div>

//                <div className="row btn">
//                    <div className="btn-item">
//                         <Button nameButton="Tiếp tục mua hàng"
//                             linkTo="/sale"
//                         />
//                    </div>
                    
//                    <div className="btn-item">
//                         <Button nameButton="Đặt Hàng"
//                             linkTo="/buy"
//                         />
//                    </div>
//                </div>


//             </div>
//             <SeparatorBar/>
//         </div>
//         : <div>Cart empty</div>
//     );
// }

import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import ItemProductCart from "../../components/ItemProductCart";
import ImageProductSlider from "../../components/ImageProductSlider"
import Button from "../../components/MyButton";
import "./style.scss";
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';

export  default function Cart(){
    let listProductCart = JSON.parse(localStorage.getItem("cart"));
    const [totalPriceCart, setTotalPriceCart] = useState(calcTotalPriceCart(listProductCart));
    const [listProductCartA, setListProductCartA] = useState(listProductCart)
    
    function calcTotalPriceCart(list){
        let t = 0;
        list.map(function(item,index){
             t = t + item.price*item.numberChoosed
        })
        console.log(t)
        return t;
    }
   useEffect(()=>{
    setTotalPriceCart( calcTotalPriceCart(listProductCart))
   },[])
   

   const handleDeleteProductCart = (index) => {
        const newP = listProductCartA.slice();
        newP.splice(index,1);
        setListProductCartA(newP) ;
        setTotalPriceCart( calcTotalPriceCart(newP))

        let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = newP;
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
    const handleAddNumberProductCartt = (index, numberNew) => {
        const newpadd = {...listProductCartA[index], numberChoosed: numberNew}
        const newP = listProductCartA.slice();
        newP[index] = newpadd;
        setListProductCartA(newP) ;
        setTotalPriceCart( calcTotalPriceCart(newP))

        let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = newP;
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
    return(
        listProductCart.length > 0 ?
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
                    {
                        listProductCartA.map(function(item,index){
                            //setTotalPriceCart(totalPriceCart + item.price)
                            return(
                                <ItemProductCart 
                                    productCart = {item} 
                                    handleDeleteProductCart={handleDeleteProductCart} 
                                    handleAddNumberProductCart = {(data,n)=>handleAddNumberProductCartt(data,n)}
                                    index={index} />
                            ) 
                        })
                    }
                  
                </div>

               <div className="row total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price"><NumberFormat value={totalPriceCart} displayType={'text'} thousandSeparator={true} /></span>
                    </div>
               </div>

               <div className="row btn">
                   <div className="btn-item">
                        <Button nameButton="Tiếp tục mua hàng"
                            linkTo="/sale"
                        />
                   </div>
                    
                   <div className="btn-item">
                        <Button nameButton="Đặt Hàng"
                            linkTo="/buy"
                        />
                   </div>
               </div>


            </div>
            <SeparatorBar/>
        </div>
        : <div className="cart-empty">Cart empty</div>
    );
}