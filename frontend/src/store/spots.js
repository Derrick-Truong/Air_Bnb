import { csrfFetch } from "./csrf";


const SPOTS_LOAD = 'spots/SPOTS_LOAD';
const ADD_TO_SPOT = 'spots/ADD_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const CURRENT_SPOTS_LOAD = 'spots/CURRENT_SPOTS_LOAD'
const CREATE_SPOT = 'spots/CREATE_SPOT_PLEASE'
const ONE_SPOT_LOAD = 'spots/ONE_SPOT_LOAD'

const createOneSpot = spot => ({
    type: CREATE_SPOT,
    spot
})

const remove = spotId => ({
    type: DELETE_SPOT,
    spotId
})
export const spotsLoad = spots => ({
    type: SPOTS_LOAD,
    spots

});

const addToSpot = spot => ({
    type: ADD_TO_SPOT,
    spot
})

const oneSpotLoad = spot => ({
    type: ONE_SPOT_LOAD,
    spot
});

export const currentSpotsLoad = spots => ({
    type: CURRENT_SPOTS_LOAD,
    spots
})

export const getSpots = () => async dispatch => {
    const res = await fetch('/api/spots')
    if (res.ok) {
        const list = await res.json();
        dispatch(spotsLoad(list))
    }
};

export const getCurrentSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const currentList = await res.json();
        dispatch(spotsLoad(currentList))
    }
};

export const getOneSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spotDetails = await res.json();
       await dispatch(oneSpotLoad(spotDetails))
        // return spotDetails
    }


};

export const updateSpot = (spot, spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const updateSpot = await res.json()
        // const data = {};
        // data[spot.id] = updateSpot;
      await  dispatch(addToSpot(updateSpot));
        // return updateSpot
    }

    return updateSpot
};

export const createSpot = (spotCreated, imagesCreated ) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotCreated)
    });
    let spotData = await response.json()
    spotData['SpotImages'] = [];
    //if we successfully find a spot, we will loop through to see if there are any images
    if (response.ok) {
        // const {id} = spotData
    for (let i=0; i < imagesCreated.length; i++ ) {
        let response2 = await csrfFetch(`/api/spots/${spotData.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagesCreated[i] )
        });
        let oneImage = await response2.json();
        if (response2.ok) {
            spotData.SpotImages.push(oneImage)
        }
    }
   await dispatch(createOneSpot(spotData))

    // return spotData
    return spotData

}

}

export const removeSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(remove(spotId));
    }
}
const initialState = {

}

const spotReducer = (prevState=initialState, action) => {
    let newState;
    switch (action.type) {
        case SPOTS_LOAD:
            newState = {}
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        case ONE_SPOT_LOAD:
            newState = {...prevState}
            newState[action.spot.id] = action.spot;
            return newState;
        case CREATE_SPOT:
            newState = {...prevState}
            newState[action.spot.id] = action.spot;
            return newState;
        case ADD_TO_SPOT:
            newState = { ...prevState }
            newState[action.spot.id] = action.spot;
            return newState;
        case DELETE_SPOT:
            newState = {...prevState};
            delete newState[action.spotId];
            return newState;
    default: return prevState
    }
}

// const spotReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case SPOTS_LOAD:
//             // action.spots.Spots.forEach((spot) => (newState.allSpots[spot.id] = spot))
//         newState = {...state, allSpots: {...state.allSpots}, oneSpot: {...state.oneSpot}}
//         action.spots.Spots.forEach((spot) => (newState.allSpots[spot.id]= spot))
//         return newState;
//         case CURRENT_SPOTS_LOAD:
//             newState = { ...state, allSpots: {}, oneSpot: { ...state.oneSpot } }
//         action.currentSpots.Spots.forEach((spot) => (newState.allSpots[spot.id] = spot));
//         return newState;
//         case ONE_SPOT_LOAD:
//             // newState = { ...state, allSpots: { ...state.allSpots, ...action.spot }, oneSpot: { ...state.oneSpot, ...action.spot } }
//             newState = {...state}
//             newState.oneSpot = action.spot
//         return newState
//         case DELETE_SPOT:
//             newState = { ...state, allSpots: { ...state.allSpots }, currentSpots: { ...state.currentSpots } }
//         delete newState.allSpots[action.spotId]
//         delete newState.currentSpots[action.spotId]
//         return newState;
//         case ADD_TO_SPOT:
//             newState = { ...state, allSpots: { ...state.allSpots, ...action.spot }, currentSpots: { ...state.currentSpots, ...action.spot }, oneSpot: { ...state.oneSpot, ...action.spot } }
//             return newState
//         case CREATE_SPOT_PLEASE:
//             newState = { ...state, allSpots: { ...state.allSpots, ...action.spot}, oneSpot: { ...state.oneSpot, ...action.spot } }
//         return newState
//          default:
//             return state
//     }


export default spotReducer;




