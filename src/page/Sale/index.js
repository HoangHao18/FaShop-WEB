import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import "./style.scss";
import FeaturedProduct from "../../components/FeaturedProduct";
import { SearchOutline } from 'react-ionicons'

export  default function About(){
    return(
        <div className="sale-page-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/slider01.jpg" title="Sale"/>
            <SeparatorBar/>
            <div className="container">
                <div className="row">
                    <div className="col-3 left-bar">
                        <div className="categories">
                            <h3 className="title">Danh mục</h3>
                            <ul className="list-categories">
                                <li>Tất cả</li>
                                <li>Hoodie</li>
                                <li>Len</li>
                                <li>Váy</li>
                                <li>Sơ Mi</li>
                                <li>Jean</li>
                            </ul>
                        </div>

                        <div className="search-product">
                            <input type="text" placeholder="Tên sản phẩm..."></input>
                            <button>
                            <SearchOutline
                                color={'#000'} 
                                title={"search-icon"}
                                height="15px"
                                width="15px"
                                />
                            </button>
                        </div>
                        
                    </div>
                    <div className="col-9 list-product">
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/ho08.png"
                                name = "Hoodie Bear Grey"
                                price = "380.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/classic02.png"
                                name = "Đầm Maxi Trắng"
                                price = "420.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/chanvayC.jpg"
                                name = "Chân váy Caro"
                                price = "480.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/vay01.jpg"
                                name = "Yếm Maxi cổ V đen"
                                price = "655.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/jean11.jpg"
                                name = "Quần Jean ống xuông trắng"
                                price = "480.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/len2.png"
                                name = "Áo Cadigan Len Xanh"
                                price = "495.000"/>
                        </div>
                        <div className="col-4">
                            <FeaturedProduct image="/assets/images/hoodieC.png" 
                                name = "Hoodie"
                                price = "495.000"/>
                        </div>
                        <div className="col-4" >
                            <FeaturedProduct image="/assets/images/hoodieC.png"
                                name = "Hoodie"
                                price = "495.000"/>
                        </div>
                        <div className="col-4" >
                            <FeaturedProduct image="/assets/images/hoodieC.png"
                                name = "Hoodie"
                                price = "495.000"/>
                        </div>
                        

                    </div>

                </div>

            </div>
            <SeparatorBar/>
        </div>
    );
}