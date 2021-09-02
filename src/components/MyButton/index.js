import './style.scss';
import { Link } from 'react-router-dom'

export default function Button({nameButton,isRadios = false,linkTo="/"}){
    if(isRadios){
        return(
           <Link to={linkTo}><button className="my-button radios">{nameButton}</button></Link>
        ) 
    }
    return(
        <Link to={linkTo}><button className="my-button">{nameButton}</button></Link>
    )
}