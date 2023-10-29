import { useState } from "react";
import { FaStar } from 'react-icons/fa';
import './rating.css';
const RatingSystem = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingClick = (currentRating) => {
        setRating(currentRating);
    };

    const handleRatingSubmit = () => {
        if (rating !== null && rating !== undefined) {
            fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            })
            .then(response => {
                if (response.ok) {
                    console.log('Rating submitted successfully');
                } else {
                    console.error('Error submitting rating');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('Please select a rating before submitting.');
        }
    };

    return (
        <form>
        <div className="Rating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={currentRating}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => handleRatingClick(currentRating)}
                        />
                        <FaStar 
                            className="star" 
                            size={50} 
                            color={currentRating <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}  
                        />
                    </label>
                );
            })}
            <p>Your rating is {rating}</p>
            <button
            type="submit"
                className="submit-button"
                onClick={handleRatingSubmit}
            >
                Submit Rating
            </button>
        </div>
        </form>
    );
}

export default function Rating() {
    return (
        <div>
            <RatingSystem />
        </div>
    );
}
