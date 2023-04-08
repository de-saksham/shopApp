export enum Category {
    VEGETABLES = 'VEGETABLES',
    FRUITS = 'FRUITS',
    CHEESE = 'CHEESE'
}
export interface CartProducts {
    _id: string;
    title: string;
    desc: string;
    price: number;
    stock: number;
    category: Category;
    quantity: number;
}

export interface Product {
    _id: string;
    title: string;
    desc: string;
    price: number;
    stock: number;
    category: Category
}

export interface State {
    isLoading: boolean;
    isSuccess: boolean;
    totalPages: number;
    currentPage: number;
    activeCategory: string;
    products: Product[];
    isCartEmpty: boolean;
    isModalActive: boolean;
    cart: CartProducts[];
    orderStatus: boolean;
}

export interface initApp {
    isSuccess: boolean,
    totalPages: number,
}

export interface storeCategory {
    category: string;
}

export interface storeProducts {
    products: Product[];
}

export interface addToCart {
    product: Product;
    quantity: number;
    variant: string;
}

export interface currentPage {
    currentPage: number;
}

export interface orderProducts {
    quantity: number;
    itemId: string;
}

export interface order {
    order: {
        userId: number,
        items: orderProducts[];
    }
}

export interface orderStatus {
    orderStatus: boolean;
}
