import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardsGrid } from './CardsGrid';

jest.mock('../Card/Card', () => ({
    Card: ({ name, image }: { name: string; image: string }) => (
        <div data-testid="card">
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    ),
}));

const mockProducts = [
    { name: 'Pikachu', image: 'https://poke.com/pikachu.png' },
    { name: 'Bulbasaur', image: 'https://poke.com/bulbasaur.png' },
];

describe('Testing CardsGrid component', () => {
    test('Should render a grid (list of cards)', () => {
        expect.hasAssertions();
        render(<CardsGrid products={mockProducts} />);

        const cards = screen.getAllByTestId('card');
        expect(cards).toHaveLength(2);
        expect(screen.getByText('Pikachu')).toBeTruthy();
        expect(screen.getByText('Bulbasaur')).toBeTruthy();
    });

    test('Should render a message if no products are passed', () => {
        render(<CardsGrid products={[]} />);
        expect(screen.queryByTestId('card')).toBeNull();
        expect(screen.getByText("Loading grid...")).toBeInTheDocument();
    });
});
