import React from "react";
import { Category } from "../../../store/types/types";
import { useSelector } from "react-redux";

interface Props {
    iconName: string;
    locationType: string;
    text?: string;
    textStyle?: string;
    activeCategory?: Category;
}

const icon = (iconName: string) => {
    return require(`../../../assets/icons/${iconName}.png`)
}

function Icons(props: Props) {
    const activeCategory = useSelector((state: any) => state.reducer.ProductReducer.activeCategory);
    console.log(activeCategory, (props.text)?.toUpperCase())
    return(
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', caretColor: 'transparent', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                    <img src={icon(props.iconName)} alt={props.iconName} style={ props.locationType === 'header' ? { height: 56, width: 56, marginLeft: 20} : {height: 30, width: 30, marginLeft: 20}}/>
                </div>
                {
                    props.text &&
                    props.locationType === 'header' ? 
                        <h3 style={{ color: '#000', marginLeft: 20}}>{props.text}</h3> :
                        <h5 style={props.text?.toUpperCase() === activeCategory ? {color: '#7149C6', marginLeft: 20, textDecoration: 'underline' } : { color: '#000', marginLeft: 20}}>{props.text}</h5>
                }
            </div>
        </div>
    )
}

export default Icons;