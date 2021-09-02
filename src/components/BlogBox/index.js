import './style.scss'

export default function BlogBox(){
    return(
        <div className="blog-box">
            <div className="bb-image">
                <img src="/assets/images/slider01.jpg"></img>  
            </div>
            <div className="bb-info">
                <a className="bb-title">Basic Elements of Clothing Design</a>
                <div className="bb-author-date">By <span className="bb-author">Sherry</span> on <span className="bb-date">May 26, 2021</span></div>
                <p className="bb-des">If you’ve always wanted to dabble in clothing design but thought you didn’t have the skill or the talent, I’m here to tell you</p>
            </div>
        </div>
    )
}