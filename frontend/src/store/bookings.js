import { csrfFetch } from "./csrf";
import spotReducer from "./spots";

const GET_ALL_BOOKINGS = 'bookings/GET_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const CURRENT_BOOKINGS = 'bookings/CURRENT_BOOKINGS'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'

export const deleteOnebooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
})
export const allbookings = bookings => ({
    type: GET_ALL_BOOKINGS,
    bookings
})

export const createbooking = (booking) => ({
    type: CREATE_BOOKING,
    booking

})
const updateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    booking

})

const allbookingsCurrentUser = (bookings) => ({

    type: CURRENT_BOOKINGS,
    bookings
})
export const createNewbooking = (spotId, booking) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)
    });

    if (res.ok) {
        const newRev = await res.json();
        dispatch(createbooking(newRev))

    }
}
export const updatebooking = (bookingId, booking) => async dispatch => {
    let res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (res.ok) {
        const newRev = await res.json();
        dispatch(updateBooking(newRev))
        return newRev
    }
}
// export const createNewbooking = (spotId, bookingNew, currentUser) => async dispatch => {
//     try {
//         const newbooking = {
//             ...bookingNew,
//             userId: currentUser.id
//         };
//         let res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
//             method: "POST",
//             body: JSON.stringify(newbooking),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         if (res.ok) {
//             const newRev = await res.json();
//             await dispatch(allSpotbookings(spotId));
//             return newRev;
//         }
//     } catch (err) {
//         console.error(err);
//     }
// };

// export const createNewbooking = (bookingNew) => async dispatch => {
//     try {
//         let res = await csrfFetch(`/api/spots / ${ bookingNew.id } / bookings`, {
//             method: "Post",
//             body: JSON.stringify(bookingNew)
//         });
//         if (res.ok) {
//             const newRev = await res.json();
//             await dispatch(allSpotbookings(bookingNew.id));
//             return newRev;
//         }
//     } catch (err) {
//         console.error(err);
//     }
// };




export const getbookingsForSpotId = (spotId) => async dispatch => {
    console.log('SpotId for bookings', spotId)
    const res = await fetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const information = await res.json();

        dispatch(allbookings(information));

    }
}

// export const getbookingsForSpotId = (spotId) => async (dispatch) => {
//     const res = await fetch('/api/spots / ${ spotId } / bookings');
//     if (res.ok) {
//         const information = await res.json();
//         const normData = {};
//         information.bookings.forEach(
//             (booking) => (normData[booking.id] = booking)
//         );
//         dispatch(allSpotbookings(spotId));
//         return normData;
//     }
// };

export const getbookingsForCurrent = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current')
    if (res.ok) {
        const currentInfo = await res.json();
        dispatch(allbookings(currentInfo))
    }
}

// export const getbookingsForCurrent = () => async (dispatch) => {
//     const res = await fetch('/api/bookings/current');
//     if (res.ok) {
//         const currentInfo = await res.json();
//         const currentData = {};
//         currentInfo.bookings.forEach(
//             (booking) => (currentData[booking.id] = booking)
//         );
//         dispatch(allbookingsCurrentUser());
//         return currentData;
//     }
// };

export const deletebooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteOnebooking(bookingId))

    }
};



const initialState = {

}


const bookingReducer = (prevState = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_BOOKINGS:
            newState = {}
            // console.log('Previous State', prevState)
            // console.log(action)
            action.bookings?.Bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState;
        case CREATE_BOOKING:
            // newState= {}
            // let booking = prevState.booking
            newState = { ...prevState }
            newState[action.booking.id] = action.booking;
            return newState;
        case UPDATE_BOOKING:
            newState = { ...prevState }
            newState[action.booking.id] = action.booking;
            return newState;
        case DELETE_BOOKING:
            newState = { ...prevState };
            delete newState[action.bookingId];
            return newState;
        default: return prevState
    }
}

export default bookingReducer;
