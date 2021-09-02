import BlogBox from '../BlogBox';
import './style.scss';

export default function ListBlogBox(){
    return(
        <div className="list-blog-box">
            <div className="row">
                <div className="col-4">
                    <BlogBox/>
                </div>
                <div className="col-4">
                    <BlogBox/>
                </div>
                <div className="col-4">
                    <BlogBox/>
                </div>
            </div>
        </div>
    )
}