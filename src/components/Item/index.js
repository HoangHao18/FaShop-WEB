import './style.scss'
import MyButton from '../MyButton'


export default function Item({image,name,isRadios=false, isInfo=false,children,linkTo="/"}){
    // if(isInfo){
    //     return(
    //         <div className="type-product">
    //             <div className="product-image"><img src={image}></img></div>
    //             {children}
    //             <div className="product-name"><MyButton nameButton={name} isRadios={isRadios}/></div>
    //         </div>
    //     )
    // }
    return(
        <div className="type-product">
            <div className="product-image"><img src={image}></img></div>
            <div className="info">{children}</div>
            <div className="product-name"><MyButton nameButton={name} isRadios={isRadios} linkTo={linkTo}/></div>         
        </div>
    )
}