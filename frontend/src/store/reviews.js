import { csrfFetch } from "./csrf";
import spotReducer from "./spots";

const GET_ALL_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const CURRENT_REVIEWS = 'reviews/CURRENT_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'

export const deleteOneReview = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
})
export const allReviews = reviews => ({
    type: GET_ALL_REVIEWS,
    reviews
})

export const createReview = (review) => ({
   type: CREATE_REVIEW,
    review

})

export const updateOneReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

export const allReviewsCurrentUser = (spotId) => ({

    type: CURRENT_REVIEWS,
    spotId
})
export const createNewReview = (spotId, review) => async dispatch => {
    console.log('CreateReview',)
        let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify(review),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const newRev = await res.json();
            dispatch(createReview(newRev))

        }
    }

export const updateReview = (reviewId, review) => async dispatch => {
    console.log('CreateReview',)
    let res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        const newRev = await res.json();
        dispatch(updateOneReview(newRev))

    }
}
// export const createNewReview = (spotId, reviewNew, currentUser) => async dispatch => {
//     try {
//         const newReview = {
//             ...reviewNew,
//             userId: currentUser.id
//         };
//         let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//             method: "POST",
//             body: JSON.stringify(newReview),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         if (res.ok) {
//             const newRev = await res.json();
//             await dispatch(allSpotReviews(spotId));
//             return newRev;
//         }
//     } catch (err) {
//         console.error(err);
//     }
// };

// export const createNewReview = (reviewNew) => async dispatch => {
//     try {
//         let res = await csrfFetch(`/api/spots / ${ reviewNew.id } / reviews`, {
//             method: "Post",
//             body: JSON.stringify(reviewNew)
//         });
//         if (res.ok) {
//             const newRev = await res.json();
//             await dispatch(allSpotReviews(reviewNew.id));
//             return newRev;
//         }
//     } catch (err) {
//         console.error(err);
//     }
// };




export const getReviewsForSpotId = (spotId) => async dispatch =>{
    console.log('SpotId for Reviews', spotId)
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
      const information = await res.json();

      dispatch(allReviews(information));

    }
}

// export const getReviewsForSpotId = (spotId) => async (dispatch) => {
//     const res = await fetch('/api/spots / ${ spotId } / reviews');
//     if (res.ok) {
//         const information = await res.json();
//         const normData = {};
//         information.reviews.forEach(
//             (review) => (normData[review.id] = review)
//         );
//         dispatch(allSpotReviews(spotId));
//         return normData;
//     }
// };

export const getReviewsForCurrent = () => async dispatch => {
    const res = await csrfFetch('/api/reviews/current')
    if (res.ok) {
        const currentInfo = await res.json();
        dispatch(allReviews(currentInfo))
    }
}

// export const getReviewsForCurrent = () => async (dispatch) => {
//     const res = await fetch('/api/reviews/current');
//     if (res.ok) {
//         const currentInfo = await res.json();
//         const currentData = {};
//         currentInfo.reviews.forEach(
//             (review) => (currentData[review.id] = review)
//         );
//         dispatch(allReviewsCurrentUser());
//         return currentData;
//     }
// };

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
       dispatch(deleteOneReview(reviewId))

    }
};



const initialState = {

}


const reviewReducer = (prevState = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = {}
            action.reviews?.Reviews?.forEach(review => {
                newState[review.id] = review
            })
            console.log('New State', newState)
            return newState;
        case CREATE_REVIEW:
            newState = { ...prevState }
            newState[action.review.id] = action.review;
            return newState;
        case UPDATE_REVIEW:
            newState = { ...prevState }
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = { ...prevState };
            delete newState[action.reviewId];
            return newState;
        default: return prevState
    }
}

export default reviewReducer;
