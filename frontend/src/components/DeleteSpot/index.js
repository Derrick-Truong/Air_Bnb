import { useDispatch, useHistory } from "react-redux";
export default function DeleteSpotForm({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(thunkDeleteSpot(spot.id));
            closeModal();
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data?.errors || ['An unknown error occurred']);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div className="form-div">
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
                    Yes, delete this spot
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
}
