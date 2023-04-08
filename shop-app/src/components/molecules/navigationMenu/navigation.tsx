import React from "react";
import Icons from "../../atoms/icon/icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeCategory, updateCurrentPage } from "../../../store/actions";
import './navigationMenu.scss';


function Navigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateActiveCategory = (category: string) => {
        dispatch(storeCategory(category.toUpperCase()));
        dispatch(updateCurrentPage(1));
        navigate(`/${category}`, {replace: true});
    };

    return(
        <div className="mainNavigationMenu">
            <Icons iconName="vegetable" text="Vegetables" locationType="nav" navigation={updateActiveCategory}/>
            <Icons iconName="fruits" text="Fruits" locationType="nav" navigation={updateActiveCategory} />
            <Icons iconName="cheese" text="Cheese" locationType="nav" navigation={updateActiveCategory} />
        </div>
    )   
};

export default Navigation;