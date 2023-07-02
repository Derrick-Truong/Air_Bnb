import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsForCurrent } from '../../store/reviews';
import OpenModalButton from '../Navigation/OpenModalButton';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteReview from '../Reviews/DeleteReview';
import UpdateReview from '../Reviews/UpdateReview';

import './Reviews.css'
const Reviews = () => {
const dispatch = useDispatch()
const reviews = useSelector(state => state?.reviews)
const reviewsVal = Object.values(reviews)

useEffect(() =>{
dispatch(getReviewsForCurrent())
}, [dispatch])


    return (
        <>
            <div className="current-reviews-title">
                {reviewsVal?.length > 0 ? <h1>Manage Your Reviews</h1> : <h1>No Reviews Posted!</h1>}
            </div>
            <div className="show-reviews">
                {reviewsVal?.map(review => {
                    const reviewDate = new Date(review.createdAt);
                    const avgRating = review?.stars
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(reviewDate);
                    return (
                        <div>
                            <nav key={review?.id}  className='review-navSpots'>
                            <NavLink to={`/spots/${review?.Spot?.id}`} className='reviews-navEachSpot'>
                                    <div className='navSpotImage-2'>
                                        <div className="review-tool-tip">{review?.Spot?.name}</div>
                                        <img src={review?.previewImage}/>
                                    </div>
                            <div className="user-reviews-box">
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
                                        <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : (3 > avgRating && avgRating >= 2) ? { color: '#ffe83d' } : (2 > avgRating && avgRating >= 1) ? { color: '#ffe83d' } : { color: '#f1f0f0' }} className="fa fa-star" ></i>
                                        <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : (3 > avgRating && avgRating >= 2) ? { color: '#ffe83d' } : { color: '#f1f0f0' }} className="fa fa-star"></i>
                                        <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : (4 > avgRating && avgRating >= 3) ? { color: '#ffe83d' } : { color: '#f1f0f0' }} className="fa fa-star"></i>
                                        <i style={(avgRating >= 5) ? { color: '#ffe83d' } : (5 > avgRating && avgRating >= 4) ? { color: '#ffe83d' } : { color: '#f1f0f0' }} className="fa fa-star"></i>
                                        <i style={(avgRating >= 5) ? { color: '#ffe83d' } : { color: '#fff' }} className="fa fa-star"></i>
                                    </div>

                                </div>
                                <div className="reviews-createdAt">{formattedDate}</div>
                                <div className="review-description">
                                    <p>{review?.review}</p>
                                </div>
                            </div>
                                </NavLink>
                            </nav>
                            <div className="update-delete-container">

                                <span className="update-bookings-button"><OpenModalButton
                                    type="submit"
                                    buttonText="Update"
                                    modalComponent={<UpdateReview reviewId={review.id} review={review} />}
                                />
                                </span>
                                <span className="delete-bookings-button"><OpenModalButton
                                    type="submit"
                                    buttonText="Delete"
                                    modalComponent={<DeleteReview reviewId={review.id} />}
                                />
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Reviews
