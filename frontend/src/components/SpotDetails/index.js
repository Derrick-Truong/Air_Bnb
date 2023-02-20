import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { getReviewsForSpotId } from '../../store/reviews';
import CreateReview from '../Reviews/CreateReview';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewForm from '../Reviews/DeleteReview';
import { getSpots } from '../../store/spots';
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.oneSpot)
    const currentUser = useSelector(state => state.session.user)
    const getReview1 = useSelector(state => state.reviews.spot)
    const imagesArr = spots.SpotImages
    const reviewsVal = Object.values(getReview1)
    const spotsVal = Object.values(spots)
    const [reviews, setReviews] = useState([]);
    const starRating = Number(spots.avgRating).toFixed(1)

    // const spotVal = Object.values(spot)
    // console.log(spot)

    useEffect(() => {
        const refresh = async() => {
        dispatch(getOneSpot(spotId));
        dispatch(getReviewsForSpotId(spotId))
        }
        refresh()
    }, [dispatch])

    if (!starRating) {
        return null
    }

    if (!imagesArr) {
        return null
    }

    if (!reviewsVal) {
        return null
    }

    const dontreview = () => {
        if (!currentUser) {
            return true
        }


        if (currentUser?.id === spots.ownerId) {
            return true
        }

        for (let oneReview of reviewsVal) {
            if (currentUser?.id === oneReview.userId) {
                return true
            }
        }



    }


    return (
        <div className="spot-details">
            <h1>{spots?.address}</h1>

            <div className="spot-area">
                <div>{spots.city}, {spots.state}, {spots.country}</div>
            </div>
            <div className='image-container'>
                <div className='images'>
                    {imagesArr[0] && <img className="big-photo" src={imagesArr[0].url} height="300px" width="40%" alt="big-pic" />}

                    {imagesArr[1] && <img className="small-photo-1" src={imagesArr[1].url} height="270px" width="250px" alt="small-pic" />}
                    {imagesArr[2] && <img className="small-photo-2" src={imagesArr[2].url} height="270px" width="250px" alt="small-pic" />}
                    {imagesArr[3] && <img className="small-photo-3" src={imagesArr[3].url} height="270px" width="250px" alt="small-pic" />}
                    {imagesArr[4] && <img className="small-photo-4" src={imagesArr[4].url} height="270px" width="250px" alt="small-pic" />}
                </div>
                <div className='floating-reserve'>

                    <div class="price">${spots.price}  per night
                     {reviewsVal.length === 0 ? <div>&#9733; New</div> : reviewsVal.length === 1 ? <div>{spots.numReviews} Review</div>
                      : <div> &#9733; {starRating} · {spots.numReviews} Reviews </div>}
                        <button type="reserve-button" onClick= {() => alert('This feature is coming')}className="reserve-button">Register</button></div>


                </div>

            </div>
            <div className="Spots-Sub-Header"> </div>
            <h1> Hosted By {spots?.Owner?.firstName} {spots?.Owner?.lastName}</h1>
            <p>{spots?.description}</p>

            <br></br> <hr class="new1"></hr>
            <div className='review-star-new'>
                <h1>{reviewsVal.length === 0 ? <div>&#9733; New</div> : reviewsVal.length === 1 ? <div>{spots.numReviews} Review</div>
                    : <div> &#9733; {starRating} · {spots.numReviews} Reviews </div>}</h1>
            </div>
            <div className="review-show">
                <div className='post-review'>
                    <div className={dontreview() ? 'noRev' : 'showRev'}>
                        <button>
                            <OpenModalMenuItem
                                itemText="Post Your Review"
                                modalComponent={<CreateReview spotId={spots.id} />}
                            />
                        </button>
                    </div>
                </div>
                {reviewsVal.length ? reviewsVal.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(review => {
                    return (
                        <div key={review?.id} clasName="Review-User-Info">
                            <div className='review-name'>{review?.User?.firstName}</div>
                            <div className='review-date'>{review?.createdAt.slice(0, 10)}</div>
                            <div className='review-comment'>{review?.review}</div>
                            {currentUser.id === review.userId &&
                                <div className="delete-review-button">
                                    <button>
                                        <OpenModalMenuItem
                                            itemText="Delete-Review"
                                            modalComponent={<DeleteReviewForm spotId={spots.id} review={review} />}
                                        />
                                    </button>
                                </div>
                            }
                        </div>
                    );
                }) :
                    // !reviewsVal.length && currentUser && currentUser.id !== spots.ownerId && (
                <p>Be the first to post a review!</p> }




            </div>
        </div>

    )
}

export default SpotDetails


