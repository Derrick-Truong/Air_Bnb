import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview, getReviewsForCurrent } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { allSpotReviews, allReviewsCurrentUser } from "../../store/reviews";



// export default function DeleteReviewForm({ review }) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const [errors, setErrors] = useState([]);

//     const submitDelete = async (e) => {
//         e.preventDefault();
//         const deleteReviewNow = await dispatch(deleteReview(review.id)).catch(async (err) => {
//             const res = err.response;
//             const data = await res.json();
//             if (data && data.errors) setErrors(data.errors);
//         });
//         await dispatch(getOneSpot(review.spotId));
//         closeModal();
//     }


//     return (
//         <div className="form-div">
//             <h1 className="title">Are you sure you want to delete this review?</h1>
//             <ul className="errors">
//                 {errors.map((error, idx) => (
//                     <li key={idx}>{error}</li>
//                 ))}
//             </ul>
//             <form className="form">
//                 <button type="submit" className="submit-button" id="deleteSpot-button" onClick={submitDelete}>
//                     Yes Delete This Review
//                 </button>
//                 <button className="submit-button" onClick={closeModal}>
//                     Cancel
//                 </button>
//             </form>
//         </div>
//     );
// }

export default function DeleteReviewForm({reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const submitDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId));
        
        closeModal();
    };

    return (
        <div className="form-div">
            <h1 className="title">Are you sure you want to delete this review?</h1>
            <ul className="errors">
            </ul>
            <form className="form">
                <button type="submit" className="submit-button" id="deleteSpot-button" onClick={submitDelete}>
                    Yes Delete This Review
                </button>
                <button className="submit-button" onClick={closeModal}>
                    Cancel
                </button>
            </form>
        </div>
    );
}



// export default function DeleteReviewForm({ review }) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const [errors, setErrors] = useState([]);

//     const submitDelete = async (e) => {
//         e.preventDefault();
//         const deleteReview = await dispatch(deleteReview(review.id)).catch(async (err) => {
//             const res = err.response;
//             const data = await res.json();
//             if (data && data.errors) setErrors(data.errors);
//         });
//         await dispatch(getOneSpot(review.spotId));
//         closeModal();
//     };

//     return (
//         <div className="form-div">
//             <h1 className="title">Are you sure you want to delete this review?</h1>
//             <ul className="errors">
//                 {errors.map((error, idx) => (
//                     <li key={idx}>{error}</li>
//                 ))}
//             </ul>
//             <form className="form">
//                 <button type="submit" className="submit-button" id="deleteSpot-button" onClick={submitDelete}>
//                     Yes Delete This Review
//                 </button>
//                 <button className="submit-button" onClick={closeModal}>
//                     Cancel
//                 </button>
//             </form>
//         </div>
//     );
// }
