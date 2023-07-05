
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { getReviewsForSpotId } from '../../store/reviews';
import CreateReview from '../Reviews/CreateReview';
import OpenModalButton from '../Navigation/OpenModalButton';
import { getbookingsForSpotId } from '../../store/bookings';
import DeleteReviewForm from '../Reviews/DeleteReview';
import { useModal } from '../../context/Modal';
import { getSpots } from '../../store/spots';
import Dates from './Dates';
import './SpotDetails.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => state?.spots)
  const currentUser = useSelector(state => state?.session?.user)
  const bookings = useSelector(state => state.bookings)
  const bookingsVal = Object.values(bookings)
  const userId = currentUser?.id
 console.log('Bookings', bookingsVal)
  const night = "per night"

  // const findUser = currentUser?.find(user => user?.user?.id === userId)

  const reviews2 = useSelector(state => state?.reviews)
  const reviewsVal = Object?.values(reviews2)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const spotsVal = spots[spotId]
  const [reviews, setReviews] = useState([]);
  const starRating = Number(spotsVal?.avgStarRating).toFixed(1)
  const price = Number(spotsVal?.price).toFixed(2)
  const foundReviewByCurrUser = reviewsVal?.find(review2 => review2?.userId === userId || review2?.spotId === spotsVal)
  const foundBookingByCurrUser = bookingsVal?.find(booking => booking.userId == userId )
  console.log(spotId)
  useEffect(() => {
    console.log('SpotId Check', spotId)
    dispatch(getOneSpot(spotId));
    console.log('SpotId Check', spotId)
    dispatch(getReviewsForSpotId(spotId))
    dispatch(getbookingsForSpotId(spotId))
  }

  , [dispatch, spotId, JSON?.stringify(spotsVal), JSON?.stringify(reviewsVal)])

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
    <section className='spots-details-section'>
      <div className='spots-details-header'>
        <div className="spots-details-info-container">
      <div className='spots-details-name'>{spotsVal?.name}</div>
        </div>
      <div className="spots-details-address-container">
        <span className="spots-details-address">{spotsVal?.city}, {spotsVal?.state}, {spotsVal?.country}</span>
        </div>
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
          {reviewsVal?.length === 0 ? <div><span>${price}/night</span> <span><span className="star">&#9733;</span> New</span></div> :
          reviewsVal?.length === 1 ? <div><span>${price}/night </span><span><span className="star">&#9733;</span> {starRating} · {spotsVal?.numReviews} Review</span></div> :
          <div><span>${price}/night</span> <span><span className="star">&#9733;</span> {starRating} · {spotsVal?.numReviews} Reviews </span></div>}


          {(currentUser?.id !== spotsVal?.ownerId) && !foundBookingByCurrUser && currentUser ?
              <OpenModalButton
                    buttonText="Book Your Stay"
                    modalComponent={<Dates spotId={spotsVal?.id} />}
                  />
          : (currentUser?.id !== spotsVal?.ownerId) && foundBookingByCurrUser && currentUser ?
              <button className="reserve-button">
                <NavLink exact to="/bookings/current">Update Your Reservation</NavLink>
              </button>:<></>
          }

      </div>

      </div>
      <div className="Spots-Sub-Header">
      <h1> Hosted By {spotsVal?.Owner?.firstName} {spotsVal?.Owner?.lastName}</h1>
      <p>{spotsVal?.description}</p>
</div>
      <br></br> <hr class="new1"></hr>
      <div className='review-container'>
      <div className='review-star-new'>
          <h1>{reviewsVal?.length === 0 ? <div> <span className="star">&#9733;</span> New</div> : reviewsVal?.length === 1 ? <div> <span className="star">&#9733;</span> {starRating} · {spotsVal?.numReviews} Review </div>
 : <div><span className="star">&#9733;</span> {starRating} · {spotsVal?.numReviews} Reviews </div>}</h1>
      </div>
      <div className="review-show">
        <div className='post-review'>

          {(((userId !== spotsVal?.ownerId) && !foundReviewByCurrUser && currentUser) )  ?
            <button className="button">
                <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<CreateReview spotId={spotsVal?.id} />}
              />
            </button> : <></>
          }
        </div>
      </div>
      <br></br>
      {reviewsVal?.length ? reviewsVal.sort((a, b) => new Date(b?.createdAt) - new Date(a.createdAt))?.map(review => {
        const reviewDate = new Date(review.createdAt);
        const avgRating = review?.stars

        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day:'numeric', year: 'numeric' }).format(reviewDate);
        return (
      <div key={review?.id} className="reviews-card-container">
        <div className="reviews-box">
          <div className="reviews-card-top">
            <div className="user">
              <div className="user-img">
                {/* <img/> */}
              </div>
              <div className="user-name">
                <div className="user-name-inner">
                  {review?.User?.firstName} {review?.User?.lastName}
                </div>
              </div>
            </div>
                < div className="reviews-rating" >
                  <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : (3 > avgRating && avgRating >= 2) ? { color: '#ffe83d' } : (2 > avgRating && avgRating >= 1) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star" ></i>
                  <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : (3 > avgRating && avgRating >= 2) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star"></i>
                  <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star"></i>
                  <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star"></i>
                  <i style={(avgRating >= 5) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star"></i>
                </div>

          </div>
          <div className="reviews-createdAt">{formattedDate}</div>
          <div className="review-description">
            <p>{review?.review}</p>
          </div>
        </div>
      </div>

        );
      }) : reviewsVal?.length === 0 && userId !== spotsVal?.ownerId && userId && currentUser ?
        <p>Be the first to post a review!</p> : <></>}
      </div>
    </section>
  )

}

export default SpotDetails


