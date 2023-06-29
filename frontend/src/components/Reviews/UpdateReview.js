import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { updateReview } from "../../store/reviews";
import { getReviewsForCurrent } from "../../store/reviews";
const UpdateReview = ({review}) => {
    const reviewId = review?.id
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUser = useSelector(state => state.session.user)
    const [updatedReview, setReview] = useState(review?.review);
    const [stars, setStars] = useState(review?.stars);
    const [error, setError] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        // if (!review) {
        //     setError("Please enter a review.");
        //     return;
        // }
        if (!updatedReview || updatedReview.length < 10) {
            setError("Please enter a review that is at least 10 characters long.");
            return;
        }

        if (stars < 1 || stars > 5) {
            setError("Star rating should be between 1 and 5.");
            return;
        }

        const newReview = {
            review: updatedReview,
            stars: stars
        };
        await dispatch(updateReview(reviewId, newReview)).then(closeModal);
        await dispatch(getReviewsForCurrent())
    };


    return (
        <div className="form-div">
            <h1 className="title">How was your stay?</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={onSubmit} className="form">
                <div className="entries">
                    <textarea
                        id="review"
                        type="text"
                        rows="10" cols="50"
                        value={updatedReview}
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
                <div className="review-submit-button-container">
                    <button className="review-submit-button">
                        Leave Review
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateReview
