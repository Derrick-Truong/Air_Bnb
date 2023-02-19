
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
        <div className="show-spots">
            {allSpots.map(spot => {
                return (
                    <nav key={spot.id} className='navSpots'>
                        <NavLink to={`/spots/${spot.id}`} className='navEachSpot'>
                            <div>
                                <div className='navSpotImage'>
                                    <img src={spot.previewImage} height='270px' width='250px' alt="Spot Image" />
                                </div>
                                <div className="navDetails">
                                    <div className="details-column">
                                        <div className="details-row">
                                            <div className="avg-rating">
                                                &#9733; {spot.avgRating ? spot.avgRating:"New"}
                                            </div>
                                            {/* <div className="star">
                                                &#9733;
                                            </div> */}
                                        </div>
                                        <div className="details-row city-state">
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
                        <div className= "current-buttons">
                            <NavLink to={`/spots/${spot.id}/edit`} className='navEachSpotEdit'>
                                <button>Update</button>
                            </NavLink>
                            <button className="current-delete-button">
                        <OpenModalMenuItem
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                        />
                            </button>
                        </div>
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

export default CurrentUser


