
import './Arrow.scss'
import { ChevronBackOutline, ChevronForwardOutline } from 'react-ionicons'

export default function ArrowPrev(props){
    return (
        <span className="arrow prevArrow" onClick={props.onClick}>
          <ChevronBackOutline
            color={'#f0f0f0'} 
            title={"prev-arrow"}
            height="40px"
            width="40px"
          />
        </span>
    );
}