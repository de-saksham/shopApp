import { Provider } from 'react-redux';

interface Props {
    children: React.ReactNode;
    reduxStore: any;
};

const MockStoreProvider = ({ children, reduxStore}: Props) => {
    <Provider store={reduxStore}>
        {children}
    </Provider>
};

export default MockStoreProvider;