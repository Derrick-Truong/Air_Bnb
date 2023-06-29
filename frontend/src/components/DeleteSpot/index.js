import { useDispatch} from "react-redux";
import { removeSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import './DeleteSpot.css'
export default function DeleteSpotModal({spotId}) {
    // const spot = useSelector()
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleDelete = async (e) => {
        e.preventDefault();
        // setErrors([]);
        dispatch(removeSpot(spotId))
        .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
        try {
            await dispatch(removeSpot(spotId));
            closeModal();
        } catch (err) {
            setErrors(err.response?.data?.errors || ['An unknown error occurred']);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
       <div className="form-div-delete">
            <h1 className="title">Are you sure you want to delete this spot?</h1>
            {errors.length > 0 && (
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleDelete} className="form">
                <button type="submit" className="submit-button" id="deleteSpot-button">
                    Yes
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    No
                </button>
            </form>
        </div>
    );
}
