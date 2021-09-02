import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderSlider from '../../components/HeaderSlider'
import ListProducts from '../../components/ListProducts'
import MyTittle from '../../components/MyTitle'
import SeparatorBar from '../../components/SeparatorBar'
import ListBlogBox from '../../components/ListBlogBox'
import FPSlider from '../../components/FPSlider'


export default function Home(){
    return(
        <div className="">
            
            <HeaderSlider/>
            <SeparatorBar/>
            <div className="container">
                
                <ListProducts/> 

                <SeparatorBar/>
                <MyTittle tittle="SẢN PHẨM MỚI NHẤT"/>  
                <FPSlider/>

                <SeparatorBar/>
                <MyTittle tittle="SẢN PHẨM BÁN CHẠY"/>  
                <FPSlider/>

                {/* <SeparatorBar/>
                <MyTittle tittle="Our blog"/>  
                <ListBlogBox/>

                <SeparatorBar/>
                <MyTittle tittle="@ FOLLOW US ON INSTAGRAM"/>   */}
            </div>
            
        </div>
    );
}