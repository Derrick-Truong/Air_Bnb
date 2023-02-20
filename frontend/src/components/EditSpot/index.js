import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpots, updateSpot } from "../../store/spots";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./EditSpot.css";

const EditSpot = () => {
    const { spotId } = useParams();
    const spots = useSelector((state) => state.spots.oneSpot);
    const spot = Object.values(spots)
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
        <section className="create-spot-div">
            <form onSubmit={handleSub}>

                <h1 className="title">Update Your Spot!</h1>

                <h3><b>Where's your place located? </b> </h3>
                <br></br>
                Guests will only get your exact address once they booked a
                reservation <br></br>
                <h4></h4>
                <label htmlFor="Country">
                    <b>Country <br></br></b>
                </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                {errors.country && <span className="error">{errors.country}</span>}
                <h4></h4>
                <label htmlFor="address">
                    {/* <b><br></br>Address</b> */}
                    <div> <div>Address</div>  {errors.address && <span className="error">{errors.address}</span>} </div>
                </label>
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                {/* {errors.address && <span className="error">{errors.address}</span>} */}
                <h4></h4>
                <label htmlFor="City">
                    <div><div>City</div>{errors.city && <span className="error">{errors.city}</span>} </div>
                </label>
                <input
                    type="text1"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <h4></h4>
                <label htmlFor="State">
                    <div><div>State</div>{errors.state && <span className="error">{errors.state}</span>}</div>
                </label>
                <input
                    type="text2"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <hr class="new1"></hr>
                <label htmlFor="Description">
                    <h3> Describe your place to your guests </h3>

                    <h8>Mention the best features of your space, any special amentities like
                        fast wif or parking, and what you love about the neighborhood.</h8>
                </label>

                <textarea
                    rows="10" cols="60"
                    // style="height: 200px"
                    type="text3"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <div>{errors.description && <span className="error">{errors.description}</span>}</div>
                <hr class="new1"></hr>
                <label htmlFor="name">
                    <h1>Create a title for your spot</h1>
                    <h8>Catch guests' attention with a spot title that highlights what makes
                        your place special</h8>
                </label>
                <input id="name" type="text" placeholder="Name your Spot" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <span className="error">{errors.name}</span>}
                <hr class="new1"></hr>
                <label htmlFor="Price">
                    <h3> Set a base price for your spot </h3>
                    <h8>Competitive pricing can help your listing stand out and rank higher
                        in search results.</h8>
                </label>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                {errors.price && <span className="error">{errors.price}</span>}

                <hr class="new1"></hr>
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
