import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.oneSpot)
    console.log(spot)


useEffect(() => {
    dispatch(getOneSpot(spotId));
}, [dispatch, spotId])

return (
<div className= "spot-details">
    <div className= "spot-images">
        <img src={spot.previewImage}/>
    </div>
</div>
)
}

export default SpotDetails
