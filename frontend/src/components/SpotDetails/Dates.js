import * as React from 'react';
import { render } from 'react-dom';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { DateRangePicker } from 'rsuite';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { createNewbooking } from '../../store/bookings';
import './Dates.css'

export default function Dates ({spotId}){
    const today = new Date()
    console.log('today', today)
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState([])

    const handleSubmit = async(e) => {
        const today = new Date()
        console.log('today', today)
        e.preventDefault()
        setErrors([]);
        const success = {
            startDate,
            endDate
        }

            return dispatch(createNewbooking(spotId, success))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="form-label">
              End date:
              <input
                className="booking-input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
            </form>
        </>
    )
}



