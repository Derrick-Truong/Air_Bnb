
import { useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { removeSpot } from "../../store/spots";
import { getCurrentSpots } from "../../store/spots";
import '../SpotsBrowser/SpotsBrowser.css'
// import { useHistory } from 'react-router-dom';


const CurrentUser = () => {
    // const history = useHistory();
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
                    <div className="navImage">
                        {/* <NavLink to={`/spots/${spot.id}`} className='navEachSpot'> */}
                        <a href={`/spots/${spot.id}`}>
                            <img src={spot.previewImage} height='270px' width='250px' alt="Spot Image" />
                        </a>
                        {/* </NavLink> */}
                        <div className='navDetails'>
                            <div>{spot.city}, {spot.state}</div>
                            <div>{spot.avgRating}</div>
                        </div>
                        <div>
                            {spot.price}
                        </div>
                    </div>
                    // <div key={spot.id} onClick={() => clickSub(spot)}>
                    //     <h2>{spot.name}</h2>
                    //     <p>{spot.description}</p>
                    // </div>
                )
            })}


        </div>
    );

}

export default CurrentUser


