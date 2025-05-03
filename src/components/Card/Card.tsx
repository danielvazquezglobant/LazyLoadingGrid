import React from 'react';
import { Product } from 'types/types';
import "./Card.css";

export const Card = ({ name, image }: Product) => {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    );
}
