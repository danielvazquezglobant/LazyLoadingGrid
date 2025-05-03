export type Product = {
    name: string;
    image: string;
}

export type PokeItem = {
    name: string;
    url: string;
}

export type Products = {
    products: Array<Product>;
    loading: boolean;
}
