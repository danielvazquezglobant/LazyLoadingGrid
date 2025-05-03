import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Products } from './Products';
import { Product } from 'types/types';

jest.mock('../../hooks/useProducts', () => ({
    useProducts: jest.fn(),
}));

jest.mock('../CardsGrid/CardsGrid', () => ({
    CardsGrid: ({ products }: { products: Product[] }) => (
        <div data-testid="cards-grid">{products.length} products</div>
    ),
}));

const { useProducts: useProductsMock } = require('../../hooks/useProducts');

const getNProducts = (num: number) => {
    return Array.from({ length: num }, (_, i) => ({
        name: `Pokemon ${i}`,
        image: `https://poke.com/${i}.png`,
    }));
};

describe('Testing Products component', () => {
    describe('Testing Products without scrolling', () => {
        const products = getNProducts(20);

        test('Should render a message when loading is true', () => {
            expect.hasAssertions();
            useProductsMock.mockReturnValue({ products: [], loading: true });

            render(<Products />);
            expect(screen.getByText("Loading...")).toBeInTheDocument();
        });

        test('Should render the first 8 products on the grid when load has finished', () => {
            expect.hasAssertions();
            useProductsMock.mockReturnValue({ products: products, loading: false });

            render(<Products />);
            expect(screen.getByTestId('cards-grid')).toHaveTextContent('8 products');
        });
    });

    describe('Testing Products scroll', () => {
        test('Should render more products when the scroll is at the bottom', () => {
            expect.hasAssertions();
            const products = getNProducts(20);
            useProductsMock.mockReturnValue({ products: products, loading: false });

            render(<Products />);

            expect(screen.getByTestId('cards-grid')).toHaveTextContent('8 products');

            Object.defineProperty(window, 'innerHeight', { value: 1000 });
            Object.defineProperty(window, 'scrollY', { value: 2000 });
            Object.defineProperty(document.body, 'offsetHeight', { value: 2500 });

            act(() => {
                window.dispatchEvent(new Event('scroll'));
            });

            expect(screen.getByTestId('cards-grid')).toHaveTextContent('16 products');
        });
    });
});
