import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const createStars = (rateVal) => {

    let stars = [];
    const flooredRatingsValue = Math.floor(rateVal);
    const remainingRatingsValue = (rateVal - flooredRatingsValue).toFixed(1);
    const defaultCount = remainingRatingsValue > 0 ? 4 : 5;
    const remainingRatings = defaultCount - flooredRatingsValue;

    for (let i = 0; i < flooredRatingsValue; i++) {
        stars.push(<span className="star" key={`${i}i`}><FaStar /></span>);
    }
    if (remainingRatingsValue > 0) {
        stars.push(<span className="star" key={'j'}><FaStarHalfAlt /></span>);
    }
    if (remainingRatings) {
        for (let k = 0; k < remainingRatings; k++) {
            stars.push(<span className="star" key={`${k}k`}><FaRegStar /></span>);
        }
    }
    return stars;
}

function Rating({ rate }) {
    return createStars(rate);
}

export default Rating;
