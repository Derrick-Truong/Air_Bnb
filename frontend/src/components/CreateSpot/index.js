import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpots, getOneSpot, getCurrentSpots } from "../../store/spots";
import "./CreateSpot.css";

const CreateSpotPlease = () => {

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
    const [errors, setErrors] = useState({});
    const [lat, setLatitude] = useState("");
    const [lng, setLongitude] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("")


    function checkURL(url) {
        return /(.*)(\.png|.jpg|.jpeg)/.test(url);
    }
  const valid = () => {
    let newErrors = {};

    if (!address) {
        newErrors.address = "Address is required."
    }

    if (!city) {
        newErrors.city = "City is required."
    }

    if (!state) {
        newErrors.state = "State is required."
      }

    if (!country) {
        newErrors.country = "Country is required."
    }

    if (!name) {
        newErrors.name = "Name is required."
    }

    if (description.length < 30) {
        newErrors.description = "Description length must be at least 30 characters."
    }

    if (!price ) {
        newErrors.price = "Price per night is required."
    }

    if (price && !(Number.isInteger(price))) {
        newErrors.price = "Price is required needs to be a number."
    }

    if (!previewImage || !checkURL(previewImage)) {
        newErrors.previewImage = "Preview image is required and must be a valid URL."
    }
    if (imageUrl && !checkURL(imageUrl)){
        newErrors.imageUrl = "URL must end in jpeg, jpg, gif, or png"
    }
      if (imageUrl2 && !checkURL(imageUrl2)) {
          newErrors.imageUrl2 = "URL must end in jpeg, jpg, gif, or png"
      }
      if (imageUrl3 && !checkURL(imageUrl3)) {
          newErrors.imageUrl3 = "URL must end in jpeg, jpg, gif, or png"
      }
      if (imageUrl4 && !checkURL(imageUrl4)) {
          newErrors.imageUrl4='URL must end in jpeg, jpg, gif, or png'
      }
    setErrors(newErrors)
console.log('NewErrors', newErrors)
}

    const handleSub = async (e) => {
        e.preventDefault();
       valid()
       if (errors.length > 0) {
        setErrors({})
       }


        const payLoad = {

            address: address,
            city: city,
            state: state,
            lat: 99 || lat,
            lng: 99 || lng,
            country: country,
            name: name,
            description: description,
            price: price
        };
            let imageList =[];
        if (previewImage) {
            const newImage = {
                preview: true,
                url: previewImage
            };
            imageList.push(newImage)
        }

        if (imageUrl) {
            const addImage = {
                preview: false,
                url: imageUrl
            }
            imageList.push(addImage)
        };
        if (imageUrl2) {
            const addImage2 = {
                preview: false,
                url: imageUrl2
            }
            imageList.push(addImage2)
        };
        if (imageUrl3) {
            const addImage3 = {
                preview: false,
                url: imageUrl3
            }
            imageList.push(addImage3)
        };
        if (imageUrl4) {
            const addImage4 = {
                preview: false,
                url: imageUrl4
            }
            imageList.push(addImage4)
        }
    //    await dispatch(createSpot(payLoad, imageList));
    //    await dispatch(getCurrentSpots())
    // console.log('Payload', payLoad)
        const newSpot = await dispatch(createSpot(payLoad, imageList));

            history.push(`/spots/${newSpot.id}`);
       


    }
    //   const newSpot=  await dispatch(createOneSpot(payLoad, imageList));
    //     if (newSpot && newSpot.id) {
    //         history.push(`/spots/${newSpot.id}`);
    //     }


    return (
        <section className="create-spot-div">
            <form onSubmit = {handleSub}>

                <h1 className="title">Create a Spot!</h1>

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
                    onChange= {e => setAddress(e.target.value)}
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
                    <div><div>State</div>{errors?.state && <span className="error">{errors?.state}</span>}</div>
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
                {/* <h3></h3> */}
                <input
                    type="text"
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                />
                {errors.previewImage && <span className="error">{errors.previewImage}</span>}

                <h4></h4>
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
                {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
                <h4></h4>
                <input
                    type="text"
                    placeholder="Image-Url2"
                    value={imageUrl2}
                    onChange={e => setImageUrl2(e.target.value)}
                />
                <h4></h4>
                {errors.imageUrl2 && <span className="error">{errors.imageUrl2}</span>}
                <input
                    type="text"
                    placeholder="Image Url3"
                    value={imageUrl3}
                    onChange={e => setImageUrl3(e.target.value)}
                />
                <h4></h4>
                {errors.imageUrl3 && <span className="error">{errors.imageUrl3}</span>}
                <input
                    type="text"
                    placeholder="Image Url4"
                    value={imageUrl4}
                    onChange={e => setImageUrl4(e.target.value)}
                />
                {errors.imageUrl4 && <span className="error">{errors.imageUrl4}</span>}
                <hr class="new1"></hr>
                <button type="submit" className="create-button">Create Spot</button>
            </form>
        </section>
    )
}

export default CreateSpotPlease
