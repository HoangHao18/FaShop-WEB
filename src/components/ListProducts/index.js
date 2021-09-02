import Item from '../Item';
import './style.scss';
export default function ListProduct(){
    return(
        <div>
            <div className="row list-product-container">
                <div className="col-4">
                    <div className="row">
                        <Item 
                            name="Váy" 
                            image="/assets/images/tp_dresses.png"/>
                    </div>
                    <div className="row">
                        <Item 
                            name="Len" 
                            image="/assets/images/lennC8.jpg"/>
                    </div>
                </div>
                <div className="col-4 row-center">
                    <div className="row">
                        <Item 
                            name="Hoodie" 
                            image="/assets/images/hoodieC.png"/>
                            
                    </div>
                    <div className="row">
                        <Item 
                            name="Jean" 
                            image="/assets/images/jean9C.jpg"/>
                    </div>
                </div> 
                <div className="col-4">
                    <div className="row">
                        <Item 
                           name="Sơ mi" 
                           image="/assets/images/somiC.jpg"/>
                    </div>
                    <div className="row more-info">      
                        <Item 
                            name="Đăng nhập" 
                            image="/assets/images/tp_background.png"
                            linkTo="/login"
                            isRadios={true}>
                            <h4>Đăng nhập tại đây</h4>
                            <p className="mess">Để cập nhật và <br/> mang về tủ đồ của bạn những set đồ xinh nhất nhé!</p>
                        </Item>
                            
                    </div>
                </div> 
            </div>
        </div>
    )
}