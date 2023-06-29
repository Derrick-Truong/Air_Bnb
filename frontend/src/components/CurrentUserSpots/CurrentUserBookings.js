import bookingReducer, { getbookingsForCurrent } from "../../store/bookings";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CurrentUserBookings.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBooking from "../Bookings/DeleteBooking";
import UpdateBookings from "../Bookings/UpdateBookings";


const CurrentUserBookings = () => {
    const dispatch = useDispatch()
    const bookings = useSelector(state => state?.bookings)
    const bookingsVal = Object.values(bookings)

    useEffect(() =>{
    dispatch(getbookingsForCurrent())
    },[dispatch])

    return(
        <>
        <div>
                <h1>Manage Your Bookings</h1>
        </div>
            <div className="show-spots">
                {bookingsVal?.map(booking => {
                    const startDate = new Date(booking.startDate);
                    const formattedStartDate = startDate.toISOString().split('T')[0];
                    const endDate = new Date(booking.endDate);
                    const formattedEndDate = endDate.toISOString().split('T')[0];
                    return (

                        <nav key={booking?.id} className='navSpots'>
                                <div>
                                    <div className='navSpotImage'>
                                        <img src={booking.previewImage} height='270px' width='250px' />
                                    </div>
                                    <div>
                                        {formattedStartDate}
                                    </div>
                                    <div>
                                        {formattedEndDate}
                                    </div>
                                </div>
                            <div className="current-buttons">
                                <br></br>


                                    <span><OpenModalMenuItem
                                        type="submit"
                                        itemText="Update"
                                        modalComponent={<UpdateBookings bookingId={booking.id} booking={booking} />}
                                    />
                                    </span>
                                <span><OpenModalMenuItem
                                    type="submit"
                                    itemText="Delete"
                                    modalComponent={<DeleteBooking bookingId={booking.id}/>}
                                />
                                </span>

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
        </>
    )
}

export default CurrentUserBookings
