// import Button from "../MyButton";
// import "./style.scss"
// import NumberFormat from 'react-number-format';
// import { useEffect, useState } from "react";

// export default function ItemProductCart({
//     img = "/assets/images/slider02.jpg",
//     name = "Mug Adventure",
//     price = "16.00",
//     quantity = "1",
//     priceTotal = "16.00",
//     color ="red",
//     size = "s",
//     numberChange

// }){
//     const [quantityProductCart, setQuantityProductCart] = useState(quantity);
    
//     useEffect(()=>{
        
//     },[quantityProductCart])
//     return(
//         <div className="item-product-cart-container">
//             <div className="row">
//                 <div className="col-2 img-col">
//                     <div className="img-product">
//                         <img src={img}></img>
//                     </div>
//                 </div>

//                 <div className="col-3 name-col">
//                     <h3>{name} <br/><span className="color-size">color: {color}, size: {size}</span></h3>
                    
//                 </div>

//                 <div className="col-2 price-col">
//                     <h3><NumberFormat value={price} displayType={'text'} thousandSeparator={true} /> VND</h3>
//                 </div>

//                 <div className="col-2 quantity-col">
//                     <h3 className="quantityy">
//                         <span><i class='bx bx-minus icon-minus' onClick={()=>{setQuantityProductCart( quantityProductCart === 1 ? 1 : quantityProductCart - 1)}}></i></span>
//                         <span className="quantity">{quantityProductCart}</span>
//                         <span><i class='bx bx-plus icon-plus' onClick={()=>{setQuantityProductCart(quantityProductCart + 1)}}></i></span>
//                     </h3>
//                 </div>

//                 <div className="col-2 price-total-col">
//                     <h3><NumberFormat value={price*quantityProductCart}  displayType={'text'} thousandSeparator={true} /> VND</h3>
//                 </div>

//                 <div className="col-1 button-col">
//                     <span><i class='bx bx-trash icon-delete'></i></span>
//                 </div>
//             </div>
//         </div>

//     )

// }

import Button from "../MyButton";
import "./style.scss"
import NumberFormat from 'react-number-format';
import { useEffect, useState } from "react";

export default function ItemProductCart({productCart,handleDeleteProductCart,handleAddNumberProductCart,index}){
    const [quantityProductCart, setQuantityProductCart] = useState(productCart.numberChoosed);
    // useEffect(()=>{
    //     handleAddNumberProductCart(quantityProductCart,index)
    // }, [quantityProductCart])
   
    return(
        <div className="item-product-cart-container">
            <div className="row">
                <div className="col-2 img-col">
                    <div className="img-product">
                        <img src={process.env.REACT_APP_API_IMG + productCart.images[0]}></img>
                    </div>
                </div>

                <div className="col-3 name-col">
                    <h3>{productCart.name} <br/><span className="color-size">color: {productCart.colorChoosed.name}, size: {productCart.sizeChoosed.name}</span></h3>
                    
                </div>

                <div className="col-2 price-col">
                    <h3><NumberFormat value={productCart.price} displayType={'text'} thousandSeparator={true} /> VND</h3>
                </div>

                <div className="col-2 quantity-col">
                    <h3 className="quantityy">
                        <span><i class='bx bx-minus icon-minus' onClick={()=>{setQuantityProductCart( quantityProductCart === 1 ? 1 : quantityProductCart - 1);handleAddNumberProductCart(index,(quantityProductCart === 1 ? 1 : quantityProductCart - 1))}}></i></span>
                        <span className="quantity">{quantityProductCart}</span>
                        <span><i class='bx bx-plus icon-plus' onClick={()=>{setQuantityProductCart(quantityProductCart == productCart.sizeChoosed.number ? quantityProductCart : quantityProductCart + 1); handleAddNumberProductCart(index,(quantityProductCart == productCart.sizeChoosed.number ? quantityProductCart : quantityProductCart + 1))}}></i></span>
                    </h3>
                </div>

                <div className="col-2 price-total-col">
                    <h3><NumberFormat value={productCart.price*quantityProductCart}  displayType={'text'} thousandSeparator={true} /> VND</h3>
                </div>

                <div className="col-1 button-col">
                    <span><i class='bx bx-trash icon-delete' onClick={()=>handleDeleteProductCart(index)}></i></span>
                </div>
            </div>
        </div>

    )

}