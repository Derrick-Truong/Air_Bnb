
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
    const spot = useSelector(state => state.spots)
    const allSpots = Object?.values(spot)

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch, JSON.stringify(allSpots)]);

    if (!allSpots) {
        return null
    }

    return (
        <div>
          <h1>Manage Your Spots</h1>
            <span className='create-spot'>
                <button type="click">
                <NavLink exact to="/spots/new" className="create-spot-2">
                    Create a New Spot
                </NavLink>
                </button>
            </span>
        <div className="show-spots">
                {allSpots?.map(spot1 => {
                    const starRating = Number(spot1?.avgRating).toFixed(1)
                    const newPrice = Number(spot1?.price).toFixed(2)
                    return (
                        <nav key={spot1.id} className='navSpots'>
                            <NavLink to={`/spots/${spot1.id}`} className='navEachSpot'>
                                <div>
                                    <div className='navSpotImage'>
                                        <img src={spot1?.previewImage} height='270px' width='250px' />
                                    </div>

                                        
                                            <div class="city-state-rating"><span>{spot1?.city}, {spot1?.state}</span><span>&#9733; {spot1?.avgRating ? starRating : "New"}</span></div>


                                    <div className="details-price">
                                        ${newPrice} night
                                    </div>

                                </div>
                            </NavLink>
                            <div className= "current-buttons">
                                <a href={`/spots/${spot1?.id}/edit`} className='navEachSpotEdit'>
                                    <span>Update</span>
                                    <span>Update</span>
                            {/* <NavLink to={`/spots/${spot1.id}/edit`} >
                                Update
                            </NavLink> */}
                                </a>
                                <br></br>
                                <a className='navEachSpotEdit'>
                                <span><OpenModalMenuItem
                                        type="submit"
                                        itemText="Delete"
                                        modalComponent={<DeleteSpotModal spotId={spot1?.id} />}
                                    />
                                    </span>
                                    <span><OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={<DeleteSpotModal spotId={spot1?.id} />}
                                    />
                                    </span>
                                </a>
                            {/* <button className="current-delete-button">
                        <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot1.id}/>}
                        />
                            </button> */}
                        </div>
                        </nav>

                    )
                })}




        </div >
        </div>
    );

}

export default CurrentUser


