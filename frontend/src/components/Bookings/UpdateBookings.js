import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBooking } from "../../store/bookings";
import { useEffect } from "react";

const UpdateBookings = ({ bookingId, booking }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);

    useEffect(() => {
        const newStartDate = new Date(booking.startDate);
        const formattedStartDate = newStartDate.toISOString().split('T')[0];
        setStartDate(formattedStartDate);

        const newEndDate = new Date(booking.endDate);
        const formattedEndDate = newEndDate.toISOString().split('T')[0];
        setEndDate(formattedEndDate);
    }, [booking.startDate, booking.endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBooking = {
            startDate,
            endDate
        };
        dispatch(updateBooking(bookingId, updatedBooking));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Start date:
                    <input
                        className="booking-input"
                        type="date"
                        placeholder={startDate}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    End date:
                    <input
                        className="booking-input"
                        type="date"
                        placeholder={endDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};
export default UpdateBookings
