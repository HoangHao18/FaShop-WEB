import './style.scss'
import MyButton from '../MyButton'
export default function FeaturedProduct({image="/assets/images/tp_watch.png", name="Watch black", price="165.90"}){
    return (
        <div className="featured-product">
            <div className="fp-image">
                <img src={image}></img>
                <div className="btn-add-to-cart"><MyButton nameButton="Thêm vào giỏ hàng" isRadios={true}/></div>
                
            </div>
            <div className="fp-info">
                <a className="fp-name">{name}</a>
                <span className="fp-price">{price} VND</span>
            </div>
        </div>
    )
}