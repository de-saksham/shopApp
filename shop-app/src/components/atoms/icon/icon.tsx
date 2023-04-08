import { Category } from "../../../store/types/types";
import { useSelector } from "react-redux";
import './icon.scss';

interface Props {
    iconName: string;
    locationType: string;
    text: string;
    textStyle?: string;
    activeCategory?: Category;
    navigation?: (category: string) => void;
    cart?: () => void;
}

const icon = (iconName: string) => {
    return require(`../../../assets/icons/${iconName}.png`)
}

function Icons(props: Props) {
    const activeCategory = useSelector((state: any) => state.reducer.ProductReducer.activeCategory);
    return(
        <div 
            onClick={() => props.navigation && props.navigation(props.text)} 
            className="iconMain"
        >
            <div className="iconContainer">
                <div className="iconDiv" onClick={() => props.cart && props.cart()}>
                    <img 
                        src={icon(props.iconName)} 
                        alt={props.iconName} 
                        className={
                            props.locationType === 'header' ? 
                                'iconHeader' : 
                                    'iconNav'
                            }      
                    />
                </div>
                {
                    props.text &&
                    props.locationType === 'header' ? 
                        <h4 className="h4">
                            {props.text}
                        </h4> :
                        <h5 className={
                            props.text?.toUpperCase() === activeCategory ? 
                                'activeCategory' : 
                                    'inactiveCategory'
                            }
                        >
                            {props.text}
                        </h5>  
                }
            </div>
        </div>
    )
}

export default Icons;