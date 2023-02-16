
import { useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { removeSpot } from "../../store/spots";
import { getCurrentSpots } from "../../store/spots";


const CurrentUser = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch])

    const spots = useSelector(state => (state.spots.allSpots))
    console.log(spots)
    
    return (
        <div>sup</div>
    )
}

export default CurrentUser


