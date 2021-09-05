import './style.scss'
import MyButton from '../MyButton'
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';

export default function FeaturedProduct({image="/assets/images/tp_watch.png", name="Watch black", price="165.90",id}){
    let history = useHistory();
    const handleOpenDetailProduct = (idP) => {
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm",idP)
        history.push(`/detailsProduct/${idP}`)
    }
    return (
        <div className="featured-product" onClick={() => handleOpenDetailProduct(id)}>
            <div className="fp-image">
                <img src={image}></img>
                <div className="btn-add-to-cart"><MyButton nameButton="Thêm vào giỏ hàng" isRadios={true}/></div>
                
            </div>
            <div className="fp-info">
                <a className="fp-name">{name}</a>
               
                <span className="fp-price"> <NumberFormat value={price} displayType={'text'} thousandSeparator={true} /> VND</span>
            </div>
        </div>
    )
}