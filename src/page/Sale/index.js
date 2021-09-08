import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import "./style.scss";
import FeaturedProduct from "../../components/FeaturedProduct";
import { SearchOutline } from 'react-ionicons'
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import { getListProductsAsync, getProductsByCategoryAsync } from "../../redux/actions/productAction";
//import NumberFormat from 'react-number-format';
import { getListCategoriesNameAsync } from "../../redux/actions/categoryAction";


export  default function About(){
    //let history = useHistory();
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListProductsAsync());
        dispatch(getListCategoriesNameAsync())
    },[]);
   
    const productList = useSelector((state) => state.products.productList);
    //const productList = useSelector((state) => state.products.productFilterByCategory);
    const isLoading = useSelector(state => state.products.isLoading)
    const categoryListName = useSelector((state) => state.categories.categoryListName);
    // const handleOpenDetailProduct = (idP) => {
    //     console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm",idP)
    //     history.push(`/detailsProduct/${idP}`)
    // }
    const [productListRender, setProductListRender] = useState(productList);
    useEffect(() => {
        setProductListRender(productList)
      },[productList]);

    const handleFilterProduct = (categoryName) =>{
        dispatch(getProductsByCategoryAsync(categoryName))
        .then(res => {
            if (res.ok) {
                // Thành công
                setProductListRender(res.productFilterByCategory)   
            } else {
                // Thất bại
                //console.log("status",status)
                setProductListRender([]) 
            }
        });
        
    }

    const handleGetAllProduct = () =>{
        setProductListRender(productList)
    }

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
                                <li onClick={()=>handleGetAllProduct()}>Tất cả</li>
                                {
                                    categoryListName && categoryListName.length > 0 ? (
                                        categoryListName.map((item, index) => 
                                           <li key={index} onClick={()=>handleFilterProduct(item.name)}>{item.name}</li>
                                        )
                                   ) : '' 
                                }
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
                        {
                            isLoading ? <div>Loading...</div> :
                            (
                                productListRender && productListRender.length > 0 ? (
                                       
                                    productListRender.map((item, index) => 
                                        <div className="col-4">
                                            <FeaturedProduct image={process.env.REACT_APP_API_IMG + item.images[0]}
                                                name = {item.name}
                                                price = {item.price}
                                                id = {item.id}
                                                // handleOnclickProduct = {(idP) => handleOpenDetailProduct(idP)}
                                                />
                                        </div> 
                                    )
                                    
                               ) : <div>Not Have Product</div>
                            )                           
                        }

                    </div>

                </div>

            </div>
            <SeparatorBar/>
        </div>
    );
}