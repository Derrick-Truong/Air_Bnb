import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { getReviewsForSpotId } from '../../store/reviews';
import CreateReview from '../Reviews/CreateReview';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewForm from '../Reviews/DeleteReview';
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.oneSpot)
    const currentUser = useSelector(state => state.session.user)
    const getReview = useSelector(state => state.reviews.spot)
    const imagesArr = spot.SpotImages
    const reviewsVal = Object.values(getReview)



    // const spotVal = Object.values(spot)
    // console.log(spot)

    useEffect(() => {
        dispatch(getOneSpot(spotId));
        dispatch(getReviewsForSpotId(spotId))
    }, [dispatch])


    if (!imagesArr) {
        return null
    }

    if (!getReview) {
        return null
    }

    const dontshowreview = () => {
        if (!currentUser) {
            return true
        }

        if (currentUser?.id === spot?.Owner?.id) {
            return true
        }
    }


    return (
        <div className="spot-details">
            <h1>{spot?.name}</h1>

            <div className="spot-area"><h2>{spot.city}, {spot.state}, {spot.country}</h2></div>
            <div className='image-container'>
            <div className='images'>
                {imagesArr[0] && <img className="big" src={imagesArr[0].url} height="300px" width="40%" alt="big-pic" />}

                   {imagesArr[1] && <img className="small" src={imagesArr[1].url} height="270px" width="250px"  alt="small-pic" />}
                    {imagesArr[2] &&<img className="small" src={imagesArr[2].url} height="270px" width="250px" alt="small-pic" />}
                    {imagesArr[3] && <img className="small" src={imagesArr[3].url} height="270px" width="250px" alt="small-pic" />}
                    {imagesArr[4] && <img className="small" src={imagesArr[4].url} height="270px" width="250px" alt="small-pic" />}
                </div>
            </div>
                <div className="Spots-Sub-Header"> </div>
                <h1> Hosted By {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h1>

                <p>{spot?.description}<button type="submit-1" className="spot-submit-1">Reserve</button></p>

                <br></br>
            <div className= "review-show">
            {reviewsVal.length ? reviewsVal.map(review => {
                console.log(review.createdAt)
                return (
                    <div key = {review.id} clasName = "Review-User-Info">
                    <div>{review.User?.firstName}</div>
                    <div>{review.createdAt.slice(0, 10)}</div>
                    <div>{review.review}</div>
                {currentUser.id === review.userId ?
                <div className = "delete-review-button">
                <button>
                <OpenModalMenuItem
                 itemText= "Delete-Review"
                 modalComponent={<DeleteReviewForm reviewId={review.id}/>}
                />
                    </button>
                </div> : <></>
                }
                </div>
                )
            })
           : <></>
        }
        {/* {currentUser?.id !== spot?.OwnerId && !reviewsVal.length ?
        <div className = "Create-A-Review">
            <button>
                <OpenModalMenuItem
                    itemText="Post Your Review"
                    modalComponent={<CreateReview spotId={spot.id} />}
                />
                </button>
        </div>:<></>
        } */}

            </div>
        </div>
            )
}

            export default SpotDetails
