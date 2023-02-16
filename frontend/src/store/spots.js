import { csrfFetch } from "./csrf";


const SPOTS_LOAD = 'spots/SPOTS_LOAD';
const ADD_TO_SPOT = 'spots/ADD_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const CURRENT_SPOTS_LOAD = 'spots/CURRENT_SPOTS_LOAD'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const ONE_SPOT_LOAD = 'spots/ONE_SPOT_LOAD'

export const createOneSpot = spotCreated => ({
    type: CREATE_SPOT,
    spotCreated
})

export const remove = spotId => ({
    type: DELETE_SPOT,
    spotId
})
export const spotsLoad = spots => ({
    type: SPOTS_LOAD,
    spots
});

export const addToSpot = addSpot => ({
    type: ADD_TO_SPOT,
    addSpot
})

export const oneSpotLoad = spot => ({
    type: ONE_SPOT_LOAD,
    spot
});

export const currentSpotsLoad = currentSpots => ({
    type: CURRENT_SPOTS_LOAD,
    currentSpots
})

export const getSpots = () => async dispatch => {
    const res = await fetch('/api/spots')

    if (res.ok) {
        const list = await res.json();
        dispatch(spotsLoad(list))

    }
};

export const getCurrentSpots = () => async dispatch => {
    const res = await fetch('/api/spots/current')

    if (res.ok) {
        const currentList = await res.json();
        dispatch(currentSpotsLoad(currentList))
    }
};

export const getOneSpot = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(oneSpotLoad(spotDetails))
    }


};

export const updateSpot = (spotId, addSpot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(addSpot)
    })
    if (res.ok) {
        const spot = await res.json();
        dispatch(addToSpot(spot))
    }

};

export const createSpot = (spotCreated) => async dispatch => {
    const response = await fetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotCreated.spot)
    });
    let bornSpot;
    if (response.ok) {
        bornSpot = await response.json();
        for (let i =0; i <= spotCreated.images.length; i++) {
            spotCreated.images[i].spotId = bornSpot.id
            if (spotCreated.images[i].length) {
                const imageNew = await csrfFetch(`/api/spots/${bornSpot.id}/images`, {

                })
            }
        }
        const spotNew = await csrfFetch('/api/spots/${snewSpot.id')
        dispatch(createOneSpot(spotNew));
        return bornSpot
    }
    return response
};

export const removeSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        const info = await res.json()
        dispatch(remove(info));
    }
}

// export const deleteSpot = ()
const initialState = {
    allSpots: {},
    oneSpot: {}
}



const spotReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case SPOTS_LOAD:
        newState = {...state, allSpots: {...state.allSpots}, oneSpot: {...state.oneSpot}}
        action.spots.Spots.forEach((spot) => (newState.allSpots[spot.id]= spot))
        return newState;
        case CURRENT_SPOTS_LOAD:
            newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
        action.currentSpots.Spots.forEach((spot) => (newState.allSpots[spot.id] = spot));
        return newState;
        case ONE_SPOT_LOAD:
            newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
        newState.oneSpot = action.spot
        return newState
        case DELETE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
        delete newState[action.spotId]
        return newState;
        case ADD_TO_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
        newState.oneSpot = action.addSpot
        return newState
        case CREATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
        newState.oneSpot = action.spotCreated
        return newState
         default:
            return state
    }
}

export default spotReducer;




