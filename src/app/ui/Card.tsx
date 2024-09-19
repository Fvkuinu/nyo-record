import React, { FC } from 'react';

interface CardProps {
    title: string;
    content: string;
    footer?: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, content, footer }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{content}</p>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;
