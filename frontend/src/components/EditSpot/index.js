import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, updateSpot } from "../../store/spots";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./EditSpot.css";

const EditSpot = () => {
    const spot = useSelector((state) => state.spots.oneSpot);
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const [latitude, setLatitude] = useState(spot?.latitude);
    const [longitude, setLongitude] = useState(spot?.longitude);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [imageUrl, setImageUrl] = useState(spot?.imageUrl);
    const [imageUrl2, setImageUrl2] = useState(spot?.imageUrl2);
    const [imageUrl3, setImageUrl3] = useState(spot?.imageUrl3);
    const [imageUrl4, setImageUrl4] = useState(spot?.imageUrl4)

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateImageUrl2 = (e) => setImageUrl2(e.target.value)
    const updateImageUrl3 = (e) => setImageUrl3(e.target.value)
    const updateImageUrl4 = (e) => setImageUrl4(e.target.value)

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])

    const handleSub = async (e) => {
        e.preventDefault();
        // let newErrors = [];

        // if (!address.length) {
        //     newErrors.push("Address is required.");
        // }

        // if (!city.length) {
        //     newErrors.push("City is required.");
        // }

        // if (!state.length) {
        //     newErrors.push("State is required.");
        // }

        // if (!country.length) {
        //     newErrors.push("Country is required.");
        // }

        // if (!name.length) {
        //     newErrors.push("Name is required.");
        // }

        // if (!description.length) {
        //     newErrors.push("Description is required.");
        // }

        // if (description.length < 30) {
        //     newErrors.push("Description length must be at least 30 characters.");
        // }

        // if (!price) {
        //     newErrors.push("Price per night is required.");
        // }

        // if (!previewImage) {
        //     newErrors.push("Preview image is required.")
        // }

        // if (!imageUrl.includes('png')) {
        //     newErrors.push("Image url must end in png")
        // }

        // if (!latitude) {
        //     newErrors.push("Latitude is required.")
        // }

        // if (!longitude) {
        //     newErrors.push("Longitude is required.")
        // }

        // setErrors(errors);

        // if (errors) {
        //     setErrors(errors)
        //     return
        // }

        // const payLoad = {
        //     spot: {
        //         address: address,
        //         city: city,
        //         state: state,
        //         country: country,
        //         name: name,
        //         description: description,
        //         price: price
        //     },
        //     images: [{
        //         preview: true,
        //         url: previewImage
        //     },
        //     {
        //         preview: false,
        //         url: imageUrl
        //     },
        //     {
        //         preview: false,
        //         url: imageUrl2
        //     },
        //     {
        //         preview: false,
        //         url: imageUrl3
        //     },
        //     {
        //         preview: false,
        //         url: imageUrl4
        //     }
        //     ]
        // };
        const payLoad = {
            address: address,
            city: city,
            country: country,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price,
            previewImage: previewImage,
            imageUrl: imageUrl,
            imageUrl2: imageUrl2,
            imageUrl3: imageUrl3,
            imageUrl4: imageUrl4

        }
        dispatch(updateSpot(payLoad));

        history.push(`/spots/${spotId}`);
    }


    return (
        //need to .map errors
        <section className="edit-spot">
            <form>
                <h1 className="title">Create a Spot!</h1>
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
                    onChange={updateAddress}
                />
                <label htmlFor="City">
                    City
                </label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={updateCity}
                />
                <label htmlFor="State">
                    State
                </label>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={updateState}
                />
                <label htmlFor="Country">
                    Country
                </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={updateCountry}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName}
                />
                <label htmlFor="Latitude">
                    Latitude
                </label>
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={updateLatitude}
                />
                <label htmlFor="Longitude">
                    Longitude
                </label>
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={updateLongitude}
                />
                <label htmlFor="Description">
                    Description
                </label>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription}
                />
                <label htmlFor="Price">
                    Price
                </label>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={updatePrice}
                />
                <input
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
                />
                <button type="submit" className="update-button" onClick={handleSub}>Update Spot</button>
            </form>
        </section>
    )
}

export default EditSpot
