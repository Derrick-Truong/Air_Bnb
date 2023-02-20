import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SpotsBrowser.css'

const SpotBrowser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots.allSpots)
    const allSpots = Object.values(spot)
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch]);

    if (!allSpots) {
        return null
    }

    const clickSub = (spot) => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div className="show-spots">
            {allSpots.map(spot => {
                const starRating = Number(spot.avgRating).toFixed(1)
                const newPrice = Number(spot.price).toFixed(2)
                return (
                    <nav key={spot.id} className='navSpots'>
                        <NavLink to={`/spots/${spot.id}`} className='navEachSpot'>
                            <div>
                                <div className='navSpotImage'>
                                    <img src={spot.previewImage} height='270px' width='250px' />
                                </div>
                                <div className="navDetails">
                                    <div className="details-city-rating">
                                        <div class="city-state">{spot.city}, {spot.state} </div>
                                        <div class="avg-rating"> &#9733; {spot.avgRating ? starRating : "New"} </div>
                                    </div>
                                </div>
                                <div className="details-price">
                                    $  {newPrice} per night
                                </div>

                            </div>
                        </NavLink>
                    </nav>
                
                )
            })}


        </div >

    );

}

export default SpotBrowser
