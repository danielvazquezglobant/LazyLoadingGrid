import { useState, useEffect } from 'react';
import { PokeItem, Product, Products } from '../types/types';

export const useProducts = (): Products => {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
            const data = await response.json();

            const newData = data.results.map((p: PokeItem, idx: number) => {
                const id = p.url.split('/').filter(Boolean).pop();

                return {
                    name: `${idx + 1}. ${p.name.charAt(0).toUpperCase() + p.name.slice(1).toLowerCase()}`,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                };
            });
            setProducts(newData);
            setLoading(false);
        };
        getProducts();
    }, []);

    return { products, loading };
}