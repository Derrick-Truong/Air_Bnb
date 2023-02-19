import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SpotsBrowser.css'

const SpotBrowser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
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
                return (
                    <nav key={spot.id} className='navSpots'>
                        <NavLink to={`/spots/${spot.id}`} className='navEachSpot'>
                        <div>
                            <div className='navSpotImage'>
                                <img src={spot.previewImage} height='270px' width='250px'/>
                            </div>
                            <div className="navDetails">
                                <div className="details-column">
                                    <div className="details-row">
                                        <div class="avg-rating">
                                                 &#9733; {spot.avgRating ? spot.avgRating: 'New'}
                                        </div>
                                        {/* <div className="star">
                                            &#9733;
                                        </div> */}
                                    </div>
                                    <div class="details-row city-state">
                                        <div>
                                            {spot.city}, {spot.state}
                                        </div>
                                    </div>
                                </div>
                                <div className="details-column">
                                    <div className="details-row price">
                                        {spot.price}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </NavLink>
                </nav>
        // <div key={spot.id} onClick={() => clickSub(spot)}>
        //     <h2>{spot.name}</h2>
        //     <p>{spot.description}</p>
        // </div>
    )
})}


        </div >

    );

    }

export default SpotBrowser
