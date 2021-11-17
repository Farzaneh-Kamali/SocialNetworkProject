import React from "react";
import './Button.style.scss';
import { useHistory } from 'react-router-dom';

interface ButtonPropsType {
    name: string;
    path: string;
}

export const ButtonPrimary = (props:{name:string}) => {
    return (
        <div className="w-full mx-auto text-center button-primary-container">
            <button className="button button-primary" type="submit" >{ props.name }</button>

        </div>
    );
};


export const ButtonSecondary = (props:ButtonPropsType) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(props.path);
    }

    return (
        <div className="w-full mx-auto text-center button-secondary-container">
            <button onClick={handleClick} className="button button-secondary w-5/6">{ props.name }</button>
        </div>
    );
};