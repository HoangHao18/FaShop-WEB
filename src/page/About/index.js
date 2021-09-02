import HeaderBar from "../../components/HeaderBar";
import Footer from "../../components/Footer";
import HeaderImage from "../../components/HeaderImage";
import SeparatorBar from "../../components/SeparatorBar";
import "./style.scss";

export  default function About(){
    return(
        <div className="about-page-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/slider01.jpg" title="About"/>
            <SeparatorBar/>
            <div className="container">
                <div className="row">
                    <div className="col-3 image">
                        <img src = "/assets/images/slider03.jpg"></img>
                    </div>
                    <div className="col-9 content">
                        <h3 className="title">Our Story</h3>
                        <p className="story">Thế giới thời trang gần 20 năm qua đã quen thuộc câu nói: “Thời trang là cách biểu hiện tối đa cá tính mỗi người”.  Ở Việt Nam thấy phần lớn mọi người thường chú trọng nhiều tới cái gọi là “mốt”, cứ vài ba tháng là một mốt mới được lăng xê, đám đông chị em phụ nữ chạy theo mải miết để rồi vài ba tháng sau lại xếp nó vào trong tủ để chạy theo kiểu mốt khác. Nhưng sự thật “mốt” là một vòng quay lặp lại từ người này sang người khác, có chăng là một chút biến tấu và cách điệu, hay nói đúng hơn người ta mua sắm theo một tâm lý “hội chứng đám đông”. Vậy những đối tượng có sự tinh tế, gu thẩm mỹ và yêu cầu khắt khe sẽ dừng lại ở đâu? Đến với thời trang Lenka để sở hữu cho mình những bộ đồ tinh tế, có gu thâm mỹ với sức lôi cuốn đến kỳ lạ.</p>
                        <p className="story">Ra đời năm 2020, thời trang FaShe với mục tiêu trở thành một trong những shop mua sắm thời trang online uy tín hàng đầu Việt Nam. Tại đây quý khách có thể mua sắm trực tuyến các sản phẩm thời trang quần, áo, chân váy, đầm,.., FaShe sẽ đáp ứng mọi nhu cầu mua sắm thời trang online của quý khách bất cứ lúc nào.</p>    
                        <p className="story">Với phương trâm luôn làm “vui lòng khách đến vừa lòng khách đi, FaShe luôn tư vấn và cố vấn thời trang cho khách có như cầu về kiểu dáng, loại vải, màu sắc để phù hợp nhất với phong cách của từng người. Không chạy đua theo xu hướng, theo “mốt”, FaShe sẽ mang đến cho bạn trải nghiệm về những món đồ thời trang, tinh tế, có gu thẩm mỹ cao và hợp với phong cách của bạn.</p>
                    </div>

                </div>

            </div>
            <SeparatorBar/>
        </div>
    );
}