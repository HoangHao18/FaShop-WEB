import HeaderBar from "../../components/HeaderBar";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import ItemProductBuy from "../../components/ItemProductBuy";
import "./style.scss";
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { useEffect, useState } from 'react';
import { loginCheckLocalAsync } from "../../redux/actions/authAction";
import { createOrderAsync} from "../../redux/actions/orderAction";
import { editProductAsync, getSingleProductAsync } from "../../redux/actions/productAction";

export  default function Buy(){
    //San Pham
    let listProductCart = JSON.parse(localStorage.getItem("cart"));
    function calcTotalPriceCart(list){
        let t = 0;
        list.map(function(item,index){
             t = t + item.price*item.numberChoosed
        })
        //console.log(t)
        return t;
    }
    const totalPriceProductBill = calcTotalPriceCart(listProductCart);
    const shipBill = 30000;
    const totalPriceBill = totalPriceProductBill + shipBill;

    //Nguoi Dat
    let dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector((state) => state.auth.userCurrent);
    const infoUserOder = {...userCurrent};
    //console.log("gggggg", userCurrent)
    useEffect(()=>{
        if(localStorage.getItem("isLogin") === "true"){
            dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])

    const [formData, setFormData] = useState({
        name: infoUserOder.name,
        phone: infoUserOder.phone,
        address: infoUserOder.address,
        note: ""
    })
    const [formValidError, setFomValidError] = useState({
        name: '', 
        phone: '',
        address: '',
        note: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

    function handleChangeFormData(key){      
        return(evt) => {   
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
            //console.log("kkk: ",formData); //note
        }
    }

    useEffect(() => {
        //console.log("kkk22: ",formData); //note
        setFomValidError(checkValidateInput(formData));
    },[formData]);

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "B???n ch??a ??i???n t??n ng?????i nh???n h??ng!"
        } 
        if(!formD.phone){
            err.phone = "B???n ch??a ??i???n s??? ??i???n tho???i!"
        } 
        if(!formD.address){
            err.address = "B???n ch??a ??i???n ?????a ch???!"
        } 
        //console.log("error form: ",err)

         if(err.name || err.phone || err.address) {
            setIsValidForm(false)
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;
    }
    ////end form

    //get list product from db
    function getListProductFromDB(listInput){
        let listOutput = [];
        listInput.map((item, index) => {
            dispatch(getSingleProductAsync(item._id))
            .then(res => {
                if (res.ok) {
                  // Th??nh c??ng
                    listOutput.push({
                        ...res.productCurrent,
                        colorChoosed: item.colorChoosed.name,
                        sizeChoosed: item.sizeChoosed.name,
                        numberChoosed: item.numberChoosed
                    }) 
                    console.log("Array OutPut: ",res.productCurrent)
                } else {
                  // Th???t b???i
                  //console.log("status",status)
                }
            });
        })

        return listOutput;
    }

    //end get list product from db

    //dat hang
    let history = useHistory();
    const handleDatHang = () => {
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid true")
        console.log("product choose: ", listProductCart);
        console.log("info user orther: ", formData);

        //dispatch(editManufactureAsync(id, {...formData}));

        const data = {
            iduseroder: userCurrent.id,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            note: formData.note,
            price_total: totalPriceProductBill,
            ship: shipBill,
            productlist: JSON.stringify(listProductCart)
        }


        //////////////// find and update number product
        let listP = [];
        listProductCart.map((item, index) => {
            dispatch(getSingleProductAsync(item._id))
            .then(res => {
                if (res.ok) {
                  // Th??nh c??ng
                    let colorsNew = JSON.parse(res.productCurrent.colors)
                    //console.log("herrrrrrrrrrrrr colorsNew",colorsNew)
                    for(let i=0; i<colorsNew.length; i++){
                        if(colorsNew[i].name == item.colorChoosed.name){
                            //console.log("herrrrrrrrrrrrr colorsNew[i].name",colorsNew[i].name)
                            for(let j = 0; j < colorsNew[i].sizes.length ; j++){
                                if(colorsNew[i].sizes[j].name == item.sizeChoosed.name){
                                    colorsNew[i].sizes[j].number = colorsNew[i].sizes[j].number - item.numberChoosed;
                                }
                            }
                        }
                    }
                    console.log("colorsNew",colorsNew)
                    dispatch(editProductAsync(item._id, {
                        ...res.productCurrent,
                        colors: JSON.stringify(colorsNew)
                    }))
                } else {
                  // Th???t b???i
                  //console.log("status",status)
                }
            });
        })
        console.log("listP",listP)

        //////////////// end find and update number product

        dispatch(createOrderAsync(data))
        .then(res => {
            console.log("ok: ",res.ok )
            if (res.ok) {
              // Th??nh c??ng
                localStorage.setItem("cart",JSON.stringify([]))
                history.push("/")
                //console.log("errResponse",errResponse)
                console.log("Kq: res: ",res)                
            } else {
              // Th???t b???i
             // console.log("status",status)
            }
        });

    }

    return(
        <div className="buy-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/slider01.jpg" title="Buy"/>
            <SeparatorBar/>
            <div className="row wrap">
            <div className="container-left col-7">
                <div className="row title-col">
                    <div className="col-5 name-col">
                        <h3>S???n Ph???m</h3>
                    </div>

                    <div className="col-2 price-col">
                        <h3>Gi??</h3>
                    </div>

                    <div className="col-2 quantity-col">
                        <h3>S??? L?????ng</h3>
                    </div>

                    <div className="col-2 price-total-col">
                        <h3>T???ng Gi??</h3>
                    </div>

                    <div className="col-1 button-col">
                        
                    </div>
                </div>

                <div className="list-product-cart">
                    {
                        listProductCart.map(function(item,index){
                            return(
                                <ItemProductBuy 
                                    img = {process.env.REACT_APP_API_IMG + item.images[0]}
                                    name = {item.name}
                                    price = {item.price}
                                    quantity = {item.numberChoosed}
                                    priceTotal = {item.price*item.numberChoosed}
                                    colorchoose ={item.colorChoosed.name}
                                    sizechoose ={item.sizeChoosed.name}
                                />
                            ) 
                        })
                    }
                </div>

               <div className="row total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">T???ng : </span>
                        <span className="bill-price"><NumberFormat value={totalPriceProductBill}  displayType={'text'} thousandSeparator={true} /> VND</span>
                    </div>
               </div>

               {/* <div className="row btn">
                   <div className="btn-item">
                        <Button nameButton="Ti???p t???c mua h??ng"/>
                   </div>
                    
                   <div className="btn-item">
                        <Button nameButton="?????t H??ng"/>
                   </div>
               </div> */}
            </div>

            <div className="container-right col-5">
               <h3 className="title-cr">?????a ch??? giao h??ng</h3>
               <form className="form-buy-info">
                    <div className="form-group">
                        <label className="label">T??n ng?????i nh???n h??ng<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            // value={userCurrent.name}
                            value={formData.name} 
                            onChange={handleChangeFormData('name')} 
                        />      
                        { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                    </div>
                    <div className="form-group">
                        <label className="label">?????a ch??? nh???n h??ng<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            //value={userCurrent.address}
                            value={formData.address} 
                            onChange={handleChangeFormData('address')} 
                        />     
                        { formValidError.address &&  <label className="label-error">{formValidError.address}</label> } 
                    </div>
                    <div className="form-group">
                        <label className="label">S??? ??i???n tho???i li??n l???c<span className="icon-s">*</span></label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            //value={userCurrent.phone}
                            value={formData.phone} 
                            onChange={handleChangeFormData('phone')}
                        /> 
                        { formValidError.phone &&  <label className="label-error">{formValidError.phone}</label> }      
                    </div>
                    <div className="form-group">
                        <label className="label">L??u ?? v???i ng?????i b??n</label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            value={formData.note} 
                            onChange={handleChangeFormData('note')}
                        />   
                        
                    </div>
                </form>
                <h3 className="title-cr">Th??ng tin ????n h??ng</h3>
                <div className="row">
                    <div className="col-6 type">Ph?? giao h??ng: </div>
                    <div className="col-6 number"><NumberFormat value={shipBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                <div className="row">
                    <div className="col-6 type">T???ng ti???n h??ng: </div>
                    <div className="col-6 number"><NumberFormat value={totalPriceProductBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                <div className="row total-bill">
                    <div className="col-6 type">T???ng c???ng: </div>
                    <div className="col-6 number"><NumberFormat value={totalPriceBill}  displayType={'text'} thousandSeparator={true} /> VND</div>
                </div>
                
                <div className="row btn-dat-hang">
                    <div onClick={()=>handleDatHang()} className="button-dathang">X??C NH???N ?????T H??NG</div>
                    {/* <Button  nameButton="?????t H??ng"/> */}
                </div>
            </div >

            </div>
           
            <SeparatorBar/>
        </div>
    );
}