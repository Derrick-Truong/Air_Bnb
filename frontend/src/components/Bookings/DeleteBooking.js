import { useDispatch } from "react-redux";
import { deletebooking } from "../../store/bookings";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";

const DeleteBooking = ({bookingId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleDelete = async (e) => {
        e.preventDefault();
        // setErrors([]);
        dispatch(deletebooking(bookingId))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );

    };

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div className="form-div-delete">
            <h1 className="title">Are you sure you want to delete this booking?</h1>
            {errors.length > 0 && (
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleDelete} className="form">
                <button type="submit" className="submit-button" id="deleteSpot-button">
                    Yes, (delete this booking)
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    No, (keep booking)
                </button>
            </form>
        </div>
    );
}

export default DeleteBooking
