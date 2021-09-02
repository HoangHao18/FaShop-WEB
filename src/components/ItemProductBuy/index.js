import Button from "../MyButton";
import "./style.scss"

export default function ItemProductbuy({
    img = "/assets/images/slider02.jpg",
    name = "Mug Adventure",
    price = "16.00",
    quantity = "1",
    priceTotal = "16.00"

}){
    return(
        <div className="item-product-buy-container">
            <div className="row">
                <div className="col-2 img-col">
                    <div className="img-product">
                        <img src={img}></img>
                    </div>
                </div>

                <div className="col-3 name-col">
                    <h3>{name}</h3>
                </div>

                <div className="col-2 price-col">
                    <h3>{price} VND</h3>
                </div>

                <div className="col-2 quantity-col">
                    <h3>
                       1
                    </h3>
                </div>

                <div className="col-2 price-total-col">
                    <h3>{priceTotal} VND</h3>
                </div>

                {/* <div className="col-1 button-col">
                    <span><i class='bx bx-trash icon-delete'></i></span>
                </div> */}
            </div>
        </div>

    )

}