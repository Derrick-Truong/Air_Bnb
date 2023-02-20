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
        if (review.length < 10) {
            setError("Your review must be at least 10 characters.");
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
        const createdReview = await dispatch(createNewReview(spotId, newReview));
        if (createdReview) {
            closeModal();
            dispatch(getOneSpot(spotId))
            return
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
            <h1 className="title">How was your stay?</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={onSubmit} className="form">
                <div className="entries">
                    <input
                        id="review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave your review here..."
                        required
                    />
                </div>

                <div className="star-icon">
                    <i className={stars >= 1 ? "fa fa-star" : "fa fa-star-o"} onClick={() => setStars(1)}></i>
                    <i className={stars >= 2 ? "fa fa-star" : "fa fa-star-o"} onClick={() => setStars(2)}></i>
                    <i className={stars >= 3 ? "fa fa-star" : "fa fa-star-o"} onClick={() => setStars(3)}></i>
                    <i className={stars >= 4 ? "fa fa-star" : "fa fa-star-o"} onClick={() => setStars(4)}></i>
                    <i className={stars >= 5 ? "fa fa-star" : "fa fa-star-o"} onClick={() => setStars(5)}></i>
                </div>
                <button type="submit" className="submit-button">
                    Leave Review
                </button>
            </form>
        </div>
    );
}
