import * as React from "react";
import Icons from "../../atoms/icon/icons";

function Header() {
    return(
        <div style={{ display: 'flex', flexDirection: 'row', position: 'fixed', width: '100%', backgroundColor: '#fff', padding: '10px', top: 0, borderBottom: '1px solid #eee', justifyContent: 'space-between', zIndex: 999 }}>
            <Icons iconName="store" locationType="header" text="FreshFoodCo" />


            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 20 }}>
                <h5>Welcome, Saksham!</h5>
                <Icons iconName="user" locationType="header" />
                <Icons iconName="cart" locationType="nav" />  
            </div>            
                    
        </div>
    )
}

export default Header;