import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useProducts } from '../hooks/useProducts';

global.fetch = require('jest-fetch-mock');

const ComponentTest = () => {
    const { products, loading } = useProducts();

    return (
        <div>
            <div data-testid="loading">{loading.toString()}</div>
            <ul>
                {products.map((p) => (
                    <li key={p.name}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
};

describe('Testing useProducts hook', () => {
    test('Should fetch and display products', async () => {
        (global.fetch as any).mockResponseOnce(
            JSON.stringify({
                results: [
                    { name: 'bulbasaur', url: 'https://poke.com/1/' },
                    { name: 'charmander', url: 'https://poke.com/4/' },
                ],
            })
        );
    
        render(<ComponentTest />);
    
        expect(screen.getByTestId('loading')).toHaveTextContent('true');
    
        await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));
    
        expect(screen.getByText('1. Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('2. Charmander')).toBeInTheDocument();
    });
});
