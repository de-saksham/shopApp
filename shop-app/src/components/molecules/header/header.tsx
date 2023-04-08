import './header.scss';
import Icons from "../../atoms/icon/icon";
import { useDispatch } from 'react-redux';
import { isModalActive } from '../../../store/actions';

function Header() {
    const dispatch = useDispatch();

    const isCartActive = () => {
        dispatch(isModalActive());
    };

    return(
        <div className='mainHeader'>
            <Icons iconName="store" locationType="header" text="FreshFoodCo" />

            <div className='userCart'>
                <h5>Welcome, Saksham!</h5>
                <Icons iconName="user" locationType="header" text='' />
                <Icons iconName="cart" locationType="nav" text='' cart={isCartActive}/>  
            </div>            
                    
        </div>
    )
}

export default Header;