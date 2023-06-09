import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentPage } from '../../../store/actions';
import './pagination.scss';
import Icons from '../icon/icon';

function Pagination() {
    const products = useSelector((state: any) => state.reducer.ProductReducer.products);
    const currentPage = useSelector((state: any) => state.reducer.ProductReducer.currentPage);

    const dispatch = useDispatch();

    const nextPage = () => {
        dispatch(updateCurrentPage(currentPage + 1));
    };

    const prevPage = () => {
        dispatch(updateCurrentPage(currentPage - 1));
    }

    return(
        <div className='mainPagination'>
            <div onClick={() => currentPage === 1 ? null : prevPage()} className='arrows'>
                <Icons text='' iconName='back' locationType='nav'/>
            </div>
            <div onClick={() => products.length === currentPage ? null : nextPage()} className='arrows'>
                <Icons text='' iconName='next' locationType='nav'/>
            </div>
        </div>
    )
};

export default Pagination;