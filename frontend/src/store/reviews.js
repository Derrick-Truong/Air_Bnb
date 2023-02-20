import { csrfFetch } from "./csrf";
import spotReducer from "./spots";

const GET_ALL_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const CURRENT_REVIEWS = 'reviews/CURRENT_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const deleteOneReview = payLoad => ({
    type: DELETE_REVIEW,
    payLoad
})
export const allSpotReviews = spotId => ({
    type: GET_ALL_REVIEWS,
    spotId
})

export const createReview = (payLoad) => ({
   type: CREATE_REVIEW,
    payLoad

})

export const allReviewsCurrentUser = (spotId) => ({

    type: CURRENT_REVIEWS,
    spotId
})
export const createNewReview = (spotId, reviewNew, currentUser) => async dispatch => {
        let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify(reviewNew),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const newRev = await res.json();

            dispatch(createReview(newRev))
            return newRev
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
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
      const information = await res.json();
      const normData = {};
        information.Reviews.forEach(review => normData[review.id] = review)
      dispatch(allSpotReviews(normData));
      return normData
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
        const currentData = {};
        currentInfo.Reviews.forEach(review => currentData[review.id] = review)
        dispatch(allReviewsCurrentUser(currentData))
        return currentData
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
       dispatch(deleteReview(reviewId))

    }
};



const initialState = {
    spot: {},
    currUser:{}
}


const reviewReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case DELETE_REVIEW:
           newState = {...state}
           delete newState.spot[action.payLoad.id]
           const nowDeleted = {
            ...newState,
            spot: {
                ...newState.spot
            }
           }
           return nowDeleted
        case GET_ALL_REVIEWS:
      return {...state, spot: {...state.spot, ...action.spotId}}
    case CREATE_REVIEW:
     let spot = state.spot
     spot[action.payLoad.id] = {...action.payLoad}
     newState = {
        ...state, spot
     }
     return newState
     default:
        return state
    }
}

export default reviewReducer;
