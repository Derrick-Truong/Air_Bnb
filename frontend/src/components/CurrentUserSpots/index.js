
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSpots } from "../../store/spots";
import '../SpotsBrowser/SpotsBrowser.css'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpot';
import './CurrentUser.css'



const CurrentUser = () => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.allSpots)
    const allSpots = Object.values(spot)

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch]);

    if (!allSpots) {
        return null
    }

    return (
        <div>
          <h1>Manage Your Spots</h1>
        <div className="show-spots">
                {allSpots.map(spot1 => {
                    const starRating = Number(spot1.avgRating).toFixed(1)
                    const newPrice = Number(spot1.price).toFixed(2)
                    return (
                        <nav key={spot1.id} className='navSpots'>
                            <NavLink to={`/spots/${spot1.id}`} className='navEachSpot'>
                                <div>
                                    <div className='navSpotImage'>
                                        <img src={spot1.previewImage} height='270px' width='250px' />
                                    </div>
                                    <div className="navDetails">
                                        <div className="details-city-rating">
                                            <div class="city-state">{spot1.city}, {spot1.state} </div>
                                            <div class="avg-rating"> &#9733; {spot1.avgRating ? starRating : "New"} </div>
                                        </div>
                                    </div>
                                    <div className="details-price">
                                        $  {newPrice} per night
                                    </div>

                                </div>
                            </NavLink>
                            <div className= "current-buttons">
                            <NavLink to={`/spots/${spot1.id}/edit`} className='navEachSpotEdit'>
                                <button>Update</button>
                            </NavLink>
                            <button className="current-delete-button">
                        <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot1.id}/>}
                        />
                            </button>
                        </div>
                        </nav>

                    )
                })}




        </div >
        </div>
    );

}

export default CurrentUser


