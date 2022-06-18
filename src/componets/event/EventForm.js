
import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCities } from "../city/CityManager.js"


import { createEvent } from "./EventManager.js"






export const EventForm = () => {
    const history = useHistory()
    const [cities, setCities] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        cityId: 1,
        imgAddress: "",
        extraLink: ""


    })

    useEffect(() => {
        getCities().then(data => setCities(data))
    }, [])

    const changeEventState = (domEvent) => {
        let eventCopy = { ...currentEvent }
        //handling a change on any one of your inputs
        //bracket notation...at the moment it changes, look at input and use string to match key on state object
        eventCopy[domEvent.target.name] = domEvent.target.value
        // if (domEvent.target.name == "title") {
        //     gameCopy.title = domEvent.target.value
        // }
        // if (domEvent.target.name == "skillLevel") {
        //     gameCopy.skillLevel = domEvent.target.value
        // } Line 31 keeps us from writing all of these if statements
        setCurrentEvent(eventCopy)
    }

    return (
        <form className="EventForm">
            <h2 className="eventForm__title">Register New Event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="cityId" className="label">City: </label>
                <div className="control">
                    <div className="select">
                        <select name="cityId"
                            proptype="int"
                            value={currentEvent.cityId}
                            onChange={changeEventState}>

                            <option value="0">Select a City</option>

                            {cities.map((c, index) => {
                                return (



                                    <option key={index} value={c.id}>
                                        {c.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </fieldset>



            <fieldset>
                <div className="form-group">
                    <label htmlFor="Date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">imgAddress: </label>
                    <input type="text" name="imgAddress" required autoFocus className="form-control"
                        value={currentEvent.imgAddress}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Extra Link: </label>
                    <input type="text" name="extraLink" required autoFocus className="form-control"
                        value={currentEvent.extraLink}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>




            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        city: parseInt(currentEvent.cityId),
                        imgAddress: currentEvent.imgAddress,
                        extraLink: currentEvent.extraLink
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}


