import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderSlider from '../../components/HeaderSlider'
import ListProducts from '../../components/ListProducts'
import MyTittle from '../../components/MyTitle'
import SeparatorBar from '../../components/SeparatorBar'
import ListBlogBox from '../../components/ListBlogBox'
import FPSlider from '../../components/FPSlider'
import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import { getListProductsAsync } from "../../redux/actions/productAction";

export default function Home(){
    let dispatch = useDispatch();
    const productList = useSelector((state) => state.products.productList);
    const isLoading = useSelector((state) => state.products.isLoading)
    console.log("productList",productList,"isloading", isLoading);

    useEffect(() => {
        dispatch(getListProductsAsync());
        console.log("productList 0",productList,"isloading", isLoading);
    }, []);
    return(
        <div className="">
            
            <HeaderSlider/>
            <SeparatorBar/>
            <div className="container">
                
                <ListProducts/> 

                <SeparatorBar/>
                <MyTittle tittle="SẢN PHẨM MỚI NHẤT"/>  
                <FPSlider
                    productList = {productList}
                    isLoading = {isLoading}
                />
                

                <SeparatorBar/>
                {/* <MyTittle tittle="SẢN PHẨM BÁN CHẠY"/>  
                <FPSlider/> */}
                 <SeparatorBar/>

                {/* <SeparatorBar/>
                <MyTittle tittle="Our blog"/>  
                <ListBlogBox/>

                <SeparatorBar/>
                <MyTittle tittle="@ FOLLOW US ON INSTAGRAM"/>   */}
            </div>
            
        </div>
    );
}