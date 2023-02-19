import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpots, updateSpot } from "../../store/spots";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./EditSpot.css";

const EditSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.oneSpot[spotId]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch])
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [lat, setLatitude] = useState(spot?.lat)
    const [lng, setLongitude] = useState(spot?.lng)
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    // const updateAddress = (e) => setAddress(e.target.value);
    // const updateCity = (e) => setCity(e.target.value);
    // const updateState = (e) => setState(e.target.value);
    // const updateCountry = (e) => setCountry(e.target.value);
    // const updateName = (e) => setName(e.target.value);
    // const updateDescription = (e) => setDescription(e.target.value);
    // const updatePrice = (e) => setPrice(e.target.value);
    // const updateLatitude = (e) => setLatitude(e.target.value);
    // const updateLongitude = (e) => setLongitude(e.target.value);
    // const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    // const updateImageUrl = (e) => setImageUrl(e.target.value);
    // const updateImageUrl2 = (e) => setImageUrl2(e.target.value)
    // const updateImageUrl3 = (e) => setImageUrl3(e.target.value)
    // const updateImageUrl4 = (e) => setImageUrl4(e.target.value)
const valid = () => {
    let newErrors = {};

    if (!address.length) {
        newErrors['address'] = "Address is required."
    }

    if (!city.length) {
        newErrors['city'] = "City is required."
    }

    if (!state.length) {
        newErrors['state'] = "State is required."
    }

    if (!country.length) {
        newErrors['country'] = "Country is required."
    }

    if (!name.length) {
        newErrors['name'] = "Name is required."
    }

    if (!description.length) {
        newErrors['description'] = "Description is required."
    }

    if (description.length < 30) {
        newErrors['description1'] = "Description length must be at least 30 characters."
    }

    if (!price) {
        newErrors['price'] = "Price per night is required."
    }
    setErrors(newErrors)
}
    const handleSub = async (e) => {
        e.preventDefault();
        // valid();
        // if (errors.length) {
        //     setErrors(errors)
        // }

        const payLoad = {
            address: address,
            city: city,
            country: country,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price,
            lat: lat || 100,
            lng: lng || 100
        }
            // previewImage: previewImage,
            // imageUrl: imageUrl,
            // imageUrl2: imageUrl2,
            // imageUrl3: imageUrl3,
            // imageUrl4: imageUrl4



        const updated = await dispatch(updateSpot(payLoad, spotId));
        if (updated) {
        history.push(`/spots/${spotId}`);
        }
    }


    return (
        //need to .map errors
        <section className="edit-spot">
            <form onSubmit={handleSub}>
                <h1 className="title">Update a Spot!</h1>
                <h2>Where's your place located?</h2>
                <h3>Guests will only get your exact address once they booked a
                    reservation.</h3>
                <label htmlFor="address">
                    Address
                </label>
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <label htmlFor="City">
                    City
                </label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <label htmlFor="State">
                    State
                </label>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <label htmlFor="Country">
                    Country
                </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                 <label htmlFor="Latitude">
                    Latitude
                </label>
                <input
                    type="text"
                    placeholder="Latitude"
                    value={lat}
                    onChange={e => setLatitude(e.target.value)}
                />
                <label htmlFor="Longitude">
                    Longitude
                </label>
                <input
                    type="text"
                    placeholder="Longitude"
                    value={lng}
                    onChange={e => setLongitude(e.target.value)}
                />
                <label htmlFor="Description">
                    Description
                </label>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="Price">
                    Price
                </label>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                {/* <input
                    type="text"
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={updatePreviewImage}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl}
                    onChange={updateImageUrl}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl2}
                    onChange={updateImageUrl2}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl3}
                    onChange={updateImageUrl3}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl4}
                    onChange={updateImageUrl4}
                /> */}
                <button type="submit" className="update-button" >Update Spot</button>
            </form>
        </section>
    )
}

export default EditSpot
