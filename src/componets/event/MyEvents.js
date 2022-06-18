import React, { useEffect, useState } from "react"
import { getUserEvents, DeleteEvent } from "./EventManager"
import { useHistory } from "react-router-dom"
import { getCities } from "../city/CityManager"



export const MyEventList = (props) => {
    const [events, setEvents] = useState([])

    const history = useHistory()
    const [cities, setCities] = useState([])

    useEffect(() => {
        getUserEvents().then(data => setEvents(data))
    }, [])


    useEffect(() => {
        getCities().then(data => setCities(data))
    }, [])


    const removeEvent = (id) => {

        DeleteEvent(id)
            .then(() => {
                getUserEvents()
                    .then((data) => {
                        setEvents(data)
                    })
            })
    }


    return (
        <>





            <article className="events">
                {
                    events.map(event => {

                        return <section key={`event--${event.id}`} className="event">

                            <img class="EventImg" src={event.imgAddress} />
                            <div className="event__des">{event.name}</div>
                            <div className="game__details">{event.description} </div>
                            {event.city.map(city => {
                                return <div className="game__details">{city.name} </div>
                            })}

                            <div className="event__time">{event.date} at {event.time} </div>
                            <button onClick={() => history.push(`/events/edit/${event.id}`)}>Edit Event</button>
                            <button onClick={() => {
                                removeEvent(event.id)
                            }}>Delete</button>




                        </section>
                    })
                }
            </article>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>



        </>
    )
}
