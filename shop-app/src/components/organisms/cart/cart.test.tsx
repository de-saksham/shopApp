import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { store } from '../../../store/store';
import mockStateData from '../../../__mocks__/mockStateData.json';
import Cart from './cart';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });


describe('Cart - Test Suite', () => {
    let shallowRenderer: any;

    beforeEach(() => {
        shallowRenderer = ShallowRenderer.createRenderer();
    });

    test('Snapshot for Cart', () => {
        shallowRenderer.render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
        expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
    });
});

describe('Cart', () => {
    const wrapper = mount(
        <Provider store={store}>
            <Cart />
        </Provider>
    );

    it('Main Cart should be rendered', () => {
        const title = wrapper.find('mainCart');
        expect(title).toBeTruthy();
    });

    it('CartItems should be rendered', () => {
        const CartItems = wrapper.find('CartItems');
        expect(CartItems).toHaveLength(1);
    });
});