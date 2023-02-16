import { useDispatch, useSelector } from "react-redux";
import { createOneSpot } from "../../store/spots";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./CreateSpot.css";

const CreateSpot = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { closeModal } = useModal();
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("")

    const createAddress = (e) => setAddress(e.target.value);
    const createCity = (e) => setCity(e.target.value);
    const createState = (e) => setState(e.target.value);
    const createCountry = (e) => setCountry(e.target.value);
    const createName = (e) => setName(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);
    const createPrice = (e) => setPrice(e.target.value);
    const createLatitude = (e) => setLatitude(e.target.value);
    const createLongitude = (e) => setLongitude(e.target.value);
    const createPreviewImage = (e) => setPreviewImage(e.target.value);
    const createImageUrl = (e) => setImageUrl(e.target.value);
    const createImageUrl2 = (e) => setImageUrl2(e.target.value)
    const createImageUrl3 = (e) => setImageUrl3(e.target.value)
    const createImageUrl4 = (e) => setImageUrl4(e.target.value)


    // const spot = useSelector((state) => (state.Spots))
    // console.log(spot)
    // const [address, useAddress]

    // useEffect(() => {
    //     dispatch(getOneSpot(spotId))
    // }, [dispatch])


    const handleSub = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!address.length) {
            newErrors['address'] ="Address is required."
        }

        if (!city.length) {
            newErrors['city']="City is required."
        }

        if (!state.length) {
            newErrors['state']= "State is required."
        }

        if (!country.length) {
            newErrors['country']= "Country is required."
        }

        if (!name.length) {
            newErrors['name'] = "Name is required."
        }

        if (!description.length) {
            newErrors['description']= "Description is required."
        }

        if (description.length < 30) {
            newErrors['description1']= "Description length must be at least 30 characters."
        }

        if (!price) {
            newErrors[price]= "Price per night is required."
        }

        if (!previewImage) {
            newErrors.push("Preview image is required.")
        }

        if (!imageUrl.includes('png')) {
            newErrors['imageUrl'] = "Image url must end in png"
        }

        if (!latitude) {
            newErrors['latitude'] = "Latitude is required."
        }

        if (!longitude) {
            newErrors[longitude] = "Longitude is required."
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
         setErrors(errors)
         return
        }

        const payLoad = {
            spot: {
            address: address,
            city: city,
            state: state,
            country: country,
            name: name,
            description: description,
            price: price
            },
            images: [{
                preview: true,
                url: previewImage
            },
                {
                    preview: false,
                    url: imageUrl
                },
                {
                    preview: false,
                    url: imageUrl2
                },
                {
                    preview: false,
                    url: imageUrl3
                },
                {
                    preview: false,
                    url: imageUrl4
                }
        ]
        };
        dispatch(createOneSpot(payLoad));

        history.push('/');
    }



    return (
        <section className="create-spot-div">
            <form>
                <h1 className="title">Create a Spot!</h1>

                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
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
                    onChange={createAddress}
                />
                <div class="please-1">
                <label htmlFor="City">
                    City
                </label>
                <input
                    type="text1"
                    placeholder="City"
                    value={city}
                    onChange={createCity}
                />
                </div>
                <div class="please-2">
                <label htmlFor="State">
                    State
                </label>
                <input type="text2"
                    placeholder="State"
                    value={state}
                    onChange={createState}/>
                </div>
                <label htmlFor="Country">
                    Country
                </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={createCountry}
                />
                <label htmlFor="Latitude">
                    Latitude
                </label>
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={createLatitude}
                />
                <label htmlFor="Longitude">
                    Longitude
                </label>
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={createLongitude}
                />
                <label htmlFor="Description">
                    Description
                </label>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={createDescription}
                />
                <label htmlFor="Price">
                    Price
                </label>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={createPrice}
                />
                <input
                type="text"
                placeholder="Preview Image"
                value={previewImage}
                onChange={createPreviewImage}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl}
                    onChange={createImageUrl}
                />
                <input
                    type="text"
                    placeholder="Image-Url2"
                    value={imageUrl2}
                    onChange={createImageUrl2}
                />
                <input
                    type="text"
                    placeholder="Image Url4"
                    value={imageUrl3}
                    onChange={createImageUrl3}
                />
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl4}
                    onChange={createImageUrl4}
                />
                <button type="submit" className="create-button" onClick={handleSub}>Create Spot</button>
            </form>
        </section>
    )
}

export default CreateSpot
