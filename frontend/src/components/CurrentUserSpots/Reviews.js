import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsForCurrent } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { deleteReview } from '../../store/reviews';
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
                {reviewsVal?.length > 0 ? <h1>Manage Your Reviews</h1> : <h1>No Current reviews!</h1>}
            </div>
            <div className="show-spots">
                {reviewsVal?.map(review => {
                    const reviewDate = new Date(review.createdAt);
                    const avgRating = review?.stars
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(reviewDate);
                    return (
                        <div>
                            <nav key={review?.id}  className='navSpots'>
                            <NavLink to={`/spots/${review?.Spot?.id}`} className='reviews-navEachSpot'>
                                <div className="reviews-navSpotImage-container">
                                    <div className='navSpotImage-2'>
                                        <img src={review?.previewImage}/>
                                    </div>
                                </div>
                            </NavLink>

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
                            </nav>
                            <div className="update-delete-container">
                                <button className="update-bookings-button"><OpenModalMenuItem
                                    type="submit"
                                    itemText="Update"
                                    modalComponent={<UpdateReview reviewId={review.id} review={review} />}
                                />
                                </button>
                                <button className="delete-bookings-button"><OpenModalMenuItem
                                    type="submit"
                                    itemText="Delete"
                                    modalComponent={<deleteReview reviewId={review.id} />}
                                />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Reviews
