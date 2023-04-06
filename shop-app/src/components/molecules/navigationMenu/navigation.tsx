import React from "react";
import Icons from "../../atoms/icon/icons";


function Navigation() {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', justifyContent: 'flex-start', width: '15%', backgroundColor: '#fff', height: '86.8vh', float: 'left', marginTop: '84px', padding: 10, borderRight: '1px solid #eee'}}>
            <Icons iconName="vegetable" text="Vegetables" locationType="nav"/>
            <Icons iconName="fruits" text="Fruits" locationType="nav" />
            <Icons iconName="cheese" text="Cheese" locationType="nav" />
        </div>
    )   
};

export default Navigation;