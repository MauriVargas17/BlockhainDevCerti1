import React from 'react';
import './feature.css';

// @ts-ignore
const Feature = ({ title, text }) => (
    <div className="peto__features-container__feature">
        <div className="peto__features-container__feature-title">
            <div />
            <h1>{title}</h1>
        </div>
        <div className="peto__features-container_feature-text">
            <p>{text}</p>
        </div>
    </div>
);

export default Feature;