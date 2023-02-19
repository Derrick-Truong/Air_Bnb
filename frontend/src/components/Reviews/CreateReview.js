import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useModal } from "your-modal-library";
import { createNewReview } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import { useSelector } from "react-redux";
import './CreateReview.css'

export default function CreateReview({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUser = useSelector(state => state.session.user)
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!review) {
            setError("Please enter a review.");
            return;
        }

        if (stars < 1 || stars > 5) {
            setError("Star rating should be between 1 and 5.");
            return;
        }

        const newReview = {
            review: review,
            stars: stars
        };
        const createdReview = await dispatch(createNewReview(spotId, newReview, currentUser));
        if (createdReview) {
            await dispatch(getOneSpot(spotId));
            closeModal();
        }
    };

    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!review) {
    //         setError("Please enter a review.");
    //         return;
    //     }

    //     if (stars < 1 || stars > 5) {
    //         setError("Star rating should be between 1 and 5.");
    //         return;
    //     }

    //     const newReview = {
    //         review: review,
    //         stars: stars
    //     };
    //     await dispatch(createNewReview(spotId, newReview, currentUser));
    //     await dispatch(getOneSpot(spotId));

    //     closeModal();
    // };

    return (
        <div className="form-div">
            <h1 className="title">Leave a Review!</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={onSubmit} className="form">
                <div className="entries">
                    <input
                        id="review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave your review"
                        required
                    />
                </div>

                <div className="entries">
                    <input
                        id="star-rating"
                        type="number"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        placeholder="Stars"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Leave Review
                </button>
            </form>
        </div>
    );
}
