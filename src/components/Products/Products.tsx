import { useState, useEffect, useCallback } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { CardsGrid } from '../CardsGrid/CardsGrid';

export const Products = () => {
    const [visibleCount, setVisibleCount] = useState(8);

    const { products, loading } = useProducts();

    const handleScroll = useCallback(() => {
        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (bottom && visibleCount < products.length) {
            setVisibleCount((prev: number) => prev + 8);
        }
    }, [products.length, visibleCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleCount, products.length, handleScroll]);

    useEffect(() => {
        setVisibleCount(8);
    }, [products]);

    if (loading) return <p>Loading...</p>

    const visibleProducts = products.slice(0, visibleCount);

    return <CardsGrid products={visibleProducts} />;
}
