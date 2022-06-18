import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCities } from "../city/CityManager.js"
import { updateEvent, getEvent } from "./EventManager.js"
import { useParams } from "react-router-dom"


export const EditEvent = () => {
    const { eventId } = useParams()

    const [event, setEvent] = useState({})

    const [cities, updateCities] = useState([])


    const history = useHistory()



    useEffect(() => {
        getCities().then(data => updateCities(data))
    }, [])



    useEffect(() => {
        getEvent(eventId).then(event => setEvent(event))
    }, [])





    const editEventState = (evt) => {
        evt.preventDefault()
        const currentEvent = { ...event }
        currentEvent[evt.target.name] = evt.target.value
        setEvent(currentEvent)
    }



    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={event.name}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Players">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">imgAddress: </label>
                    <input type="text" name="imgAddress" required autoFocus className="form-control"
                        value={event.imgAddress}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>



            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedEvent = {
                        eventId: parseInt(eventId),
                        name: event.name,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        imgAddress: event.imgAddress,
                        city: parseInt(event.city) || event.city.id


                    }

                    // Send POST request to your API
                    updateEvent(updatedEvent)
                        .then(() => history.push("/events/myevents"))
                }}
                className="btn btn-primary">Edit</button>
        </form>
    )
}


































































