import React from 'react';
import { Card } from '../Card/Card';
import { Product } from 'types/types';
import './CardsGrid.css';

export const CardsGrid = ({ products }: { products: Array<Product> }) => {
    if (!products || !products.length) return <p>Loading grid...</p>

    return (
        <div className="grid">
            {
                products.map(p => (
                    <div key={p.name} className="product">
                        <Card name={p.name} image={p.image}/>
                    </div>
                ))
            }
        </div >  
    );
}
