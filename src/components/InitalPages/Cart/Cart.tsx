import React from 'react';
import { FunctionComponent } from 'react';
import "./Cart.style.scss";


export const Cart : FunctionComponent = CartProps => {
    return (
        <div className="cart-initial-pages">
            { CartProps.children }
        </div>
    );
};