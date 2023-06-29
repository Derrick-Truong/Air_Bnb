import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatebooking } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { getbookingsForCurrent } from "../../store/bookings";
import './UpdateBooking.css'

const UpdateBookings = ({ booking }) => {
    const dispatch = useDispatch();
    const bookingId = booking?.id
    const {closeModal} = useModal()
    const [startDate, setStartDate] = useState(booking?.startDate);
    const [endDate, setEndDate] = useState(booking?.endDate);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const newStartDate = new Date(booking?.startDate);
        const formattedStartDate = newStartDate?.toISOString()?.split('T')[0];
        setStartDate(formattedStartDate);

        const newEndDate = new Date(booking?.endDate);
        const formattedEndDate = newEndDate.toISOString().split('T')[0];
        setEndDate(formattedEndDate);
    }, [booking.startDate, booking.endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const updatedBooking = {
            startDate,
            endDate
        };
       await dispatch(updatebooking(bookingId, updatedBooking))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    };

    return (
        <>
            <form className="update-booking-container" onSubmit={handleSubmit}>
                <div>
                    {errors.length > 0 && (
                        <ul className="error-messages">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
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
                <button className="update-booking-button">Submit</button>
            </form>
        </>
    );
};
export default UpdateBookings
