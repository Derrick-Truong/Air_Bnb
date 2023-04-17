
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { getReviewsForSpotId } from '../../store/reviews';
import CreateReview from '../Reviews/CreateReview';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewForm from '../Reviews/DeleteReview';
import { useModal } from '../../context/Modal';
import { getSpots } from '../../store/spots';
import './SpotDetails.css'

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => state?.spots)
  const currentUser = useSelector(state => state?.session?.user)
  const userId = currentUser?.id
  console.log('UserId', currentUser)
  const night = "per night"
  // const findUser = currentUser?.find(user => user?.user?.id === userId)

  const reviews2 = useSelector(state => state?.reviews)
  const reviewsVal = Object?.values(reviews2)

  console.log('ReviewsVal', reviewsVal)
  // const imagesArr = spots.spot.SpotImages
  // const reviewsVal = getReview1[reviewId]
  console.log('Reviews for one Spot', reviewsVal)
  const spotsVal = spots[spotId]
  console.log('Spots', spots)
  console.log('SpotsVal', spotsVal)
  // console.log('Images', spotsVal.SpotImages)
  const [reviews, setReviews] = useState([]);
  const starRating = Number(spotsVal?.avgStarRating).toFixed(1)
  const price = Number(spotsVal?.price).toFixed(2)
  const foundReviewByCurrUser = reviewsVal?.find(review2 => review2?.userId === userId || review2?.spotId === spotsVal)

  console.log(spotId)
  useEffect(() => {
    console.log('SpotId Check', spotId)
    dispatch(getOneSpot(spotId));
    console.log('SpotId Check', spotId)
    dispatch(getReviewsForSpotId(spotId))

  }, [dispatch, JSON?.stringify(spotsVal), JSON?.stringify(reviewsVal)])

  // if (!starRating) {
  //     return null
  // }

  if (!spotsVal) {
    return null
  }
  if (!reviewsVal) {
    return null
  }

  // if (!userId) {
  //   return null
  // }

  // const dontreview = () => {
  //     if (!currentUser) {
  //         return true
  //     }


  //     if (currentUser?.id === spots.ownerId) {
  //         return true
  //     }

  //     for (let oneReview of reviewsVal?.length) {
  //         if (currentUser?.id === oneReview.userId) {
  //             return true
  //         }
  //     }



  // }
  return (
    <>
      <h1>{spotsVal?.name}</h1>
      <div className="spot-area">
        <h3>{spotsVal?.city}, {spotsVal?.state}, {spotsVal?.country}</h3>
      </div>
      <div className="spot-images">
      {spotsVal?.SpotImages?.map(image => {
        return (
          // {spotsVal.SpotImages[0] && <img className="big-photo" src={spotsVal.SpotImages[0].url} height="300px" width="40%" alt="big-pic" />}

          image && <img className="small-photo-1" src={image?.url} alt="small-pic" />

        )
      })}
      </div>
      <div className='floating-reserve'>

        <div class="price">
          {reviewsVal?.length === 0 ? <div> <span>${price} night</span> &#9733; New</div> : reviewsVal?.length === 1 ? <div><span>${price} per night </span> &#9733; {starRating} · {spotsVal?.numReviews} Review</div> : <div><span>{price} night</span> &#9733; {starRating} · {spotsVal?.numReviews} Reviews </div>}
          <button type="reserve-button" onClick={() => alert('This feature is coming')} className="reserve-button">Register</button></div>


      </div>
      <div className="Spots-Sub-Header"> </div>
      <h1> Hosted By {spotsVal?.Owner?.firstName} {spotsVal?.Owner?.lastName}</h1>
      <p>{spotsVal?.description}</p>

      <br></br> <hr class="new1"></hr>
      <div className='review-star-new'>
        <h1>{reviewsVal?.length === 0 ? <div>&#9733; New</div> : reviewsVal?.length === 1 ? <div> &#9733; {starRating} · {spotsVal?.numReviews} Review </div>
 : <div> &#9733; {starRating} · {spotsVal?.numReviews} Reviews </div>}</h1>
      </div>
      <div className="review-show">
        <div className='post-review'>

          {(((userId !== spotsVal?.ownerId) && !foundReviewByCurrUser && currentUser) )  ?
            <button className="button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<CreateReview spotId={spotsVal?.id} />}
              />
            </button> : <></>

          }
        </div>
      </div>
      {reviewsVal?.length ? reviewsVal.sort((a, b) => new Date(b?.createdAt) - new Date(a.createdAt))?.map(review => {
        const reviewDate = new Date(review.createdAt);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(reviewDate);
        return (
          <div key={review?.id} className="review-user-info">
            <div className='review-name'>{review?.User?.firstName}</div>
            <div className='review-date'>{formattedDate}</div>
            <div className='review-comment'>{review?.review}</div>
            {userId === review?.userId ?
              <div className="delete-review-button">
                <button>
                  <OpenModalMenuItem
                    itemText="Delete Review"

                    modalComponent={<DeleteReviewForm reviewId={review?.id} />}
                  />
                </button>
              </div> : <></>
            }
          </div>
        );
      }) : reviewsVal?.length === 0 && userId !== spotsVal?.ownerId && userId ?
        <p>Be the first to post a review!</p> : <></>}

    </>
  )

}

export default SpotDetails


