export enum Category {
    VEGETABLES = 'VEGETABLES',
    FRUITS = 'FRUITS',
    CHEESE = 'CHEESE'
}

export interface CartProducts {
    quantity: number;
    product: Product;
}

export interface Cart {
    cartId: string;
    products: CartProducts | CartProducts[]; 
}

export interface Product {
    _id: string;
    title: string;
    desc: string;
    price: number;
    stock: number;
    category: Category
};

export interface State {
    isLoading: boolean;
    isSuccess: boolean;
    totalPages: number;
    currentPage: number;
    activeCategory: string;
    products: Product[];
    isCartEmpty: boolean;
    isModalActive: boolean;
    cart: Cart;
};

export interface initApp {
    isSuccess: boolean,
    totalPages: number, 
};

export interface storeCategory {
    category: string;
};

export interface storeProducts {
    products: Product[];
};

export interface addToCart {
    cart: Cart;
}
