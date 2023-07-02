import bookingReducer, { getbookingsForCurrent } from "../../store/bookings";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Bookings.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../Navigation/OpenModalButton";
import DeleteBooking from "../Bookings/DeleteBooking";
import UpdateBookings from "../Bookings/UpdateBookings";


const CurrentUserBookings = () => {
    const dispatch = useDispatch()
    const bookings = useSelector(state => state?.bookings)
    const bookingsVal = Object.values(bookings)

    useEffect(() =>{
    dispatch(getbookingsForCurrent())
    },[dispatch, JSON.stringify(bookingsVal)])

    return(
        <>
        <div className="current-bookings-title">
                {bookingsVal?.length > 0 ? <h1>Manage Your Bookings</h1> : <h1>No Current Bookings!</h1>}
        </div>
            <div className="show-spots">
                {bookingsVal?.map(booking => {
                    const startDate = new Date(booking?.startDate);
                    const formattedStartDate = startDate?.toISOString()?.split('T')[0];
                    const endDate = new Date(booking?.endDate);
                    const formattedEndDate = endDate?.toISOString()?.split('T')[0];
                    return (
                        <div>
                        <nav key={booking?.id} className='navSpots'>
                            <NavLink to={`/spots/${booking?.Spot?.id}`} className='navEachSpot'>
                                <div>
                                    <div className='navSpotImage'>
                                        <div className="tool-tip">{booking?.Spot?.name}</div>
                                        <img src={booking?.previewImage} height='270px' width='250px' />
                                    </div>
                                    <div className="booking-start-date">
                                        Start Date: {formattedStartDate}
                                    </div>
                                    <div className="booking-end-date">
                                        End Date: {formattedEndDate}
                                    </div>

                                </div>
                                </NavLink>
                            </nav>
                            <div className="update-delete-container">

                                <span className="update-bookings-button"><OpenModalButton
                                    type="submit"
                                    buttonText="Update"
                                    modalComponent={<UpdateBookings bookingId={booking.id} booking={booking} />}
                                />
                                </span>
                                <span className="delete-bookings-button"><OpenModalButton
                                    type="submit"
                                    buttonText="Delete"
                                    modalComponent={<DeleteBooking bookingId={booking.id} />}
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

export default CurrentUserBookings
