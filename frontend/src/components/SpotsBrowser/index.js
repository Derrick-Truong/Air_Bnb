import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SpotsBrowser.css'

const SpotBrowser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.session?.user)
    const spots = useSelector(state => state?.spots)
    const allSpots = Object?.values(spots)
    const space = "                          "
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch, JSON.stringify(allSpots)]);

    if (!allSpots) {
        return null
    }

    const clickSub = (spot) => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div className="show-spots">
            {allSpots?.map(spot => {
                const starRating = Number(spot?.avgRating).toFixed(1)
                const newPrice = Number(spot?.price).toFixed(2)
                return (
                    <div className="spot-container">
                    <nav key={spot.id} className='navSpots'>
                        <NavLink to={`/spots/${spot?.id}`} className='navEachSpot' onClick={() => clickSub(spot)}>

                                <div className='navSpotImage1'>
                                    <img src={spot?.previewImage} height='270px' width='250px' />
                                </div>

                                        <div class="city-state-rating"><span>{spot?.city}, {spot?.state}</span><span>&#9733; {spot?.avgRating ? starRating : "New"}</span></div>
                                        {/* <div class="avg-rating">&#9733;{spot?.avgRating ? starRating:"New"}</div> */}


                                <div className="details-price">
                                    $  {newPrice} per night
                                </div>
                        </NavLink>
                    </nav>
                    </div>

                )
            })}


        </div >

    );

}

export default SpotBrowser
