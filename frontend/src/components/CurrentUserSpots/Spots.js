
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSpots } from "../../store/spots";
import '../SpotsBrowser/SpotsBrowser.css'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpot';

import './Spots.css'



const CurrentUserSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session.user)
    const spot = useSelector(state => state?.spots)
    const allSpots = Object?.values(spot)

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch, JSON.stringify(allSpots)]);

    if (!allSpots) {
        return null
    }
    if (!user) {
        history.push("/")
    }
    return (
        <>
        <div className="spots-title-container">
            <div>
                    {allSpots?.length > 0 ? <h1>Manage Your Spots</h1> : <h1>No Spots Owned!</h1>}
                </div>
            <div className='create-spot'>
                <button type="click">
                <NavLink exact to="/spots/new" className="create-spot-1">
                    Create a New Spot
                </NavLink>
                </button>
            </div>
            </div>
        <div className="show-spots">
                {allSpots?.map(spot1 => {
                    const starRating = Number(spot1?.avgRating).toFixed(1)
                    const newPrice = Number(spot1?.price).toFixed(2)
                    return (
                        <div>
                        <nav key={spot1.id} className='navSpots'>
                            <NavLink to={`/spots/${spot1?.id}`} className='navEachSpot'>
                                <div>
                                    <div className='navSpotImage'>
                                        <div className="tool-tip">{spot1?.name}</div>
                                        <img src={spot1?.previewImage} height='270px' width='250px' />
                                    </div>


                                            <div class="city-state-rating"><span>{spot1?.city}, {spot1?.state}</span><span><span className="star">&#9733;</span> {spot1?.avgRating ? starRating : "New"}</span></div>


                                    <div className="details-price">
                                        ${newPrice} night
                                    </div>

                                </div>
                            </NavLink>
                            </nav>
                            <div className="update-delete-container">
                                <a href={`/spots/${spot1?.id}/edit`} className="update-bookings-button">Update</a>
                                <button className="delete-bookings-button"><OpenModalMenuItem
                                    type="submit"
                                    itemText="Delete"
                                    modalComponent={<DeleteSpotModal spotId={spot1?.id} />}
                                />
                                </button>
                            </div>

                        </div>
                    )
                })}




        </div>
        </>
    );

}

export default CurrentUserSpots


