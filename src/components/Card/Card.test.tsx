import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Testing Card component', () => {
    const product = {
        name: 'Pikachu',
        image: 'https://poke.com/pikachu.png'
    };

    test('Should render the card and get the name', () => {
        expect.hasAssertions();
        render(<Card {...product} />);

        expect(screen.getByText('Pikachu')).toBeTruthy();
    });

    test('Should render the image in the card and get the src attribute', () => {
        expect.hasAssertions();
        render(<Card {...product} />);

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', product.image);
    });
});
