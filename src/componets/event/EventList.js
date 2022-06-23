import React, { useEffect, useState } from 'react'
import { getEvents } from './EventManager'
import { useHistory } from 'react-router-dom'
import { getCities } from '../city/CityManager'
import './Event.css'

export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const [query, setQuery] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchedEvents, setSearchedEvents] = useState([])
  const history = useHistory()
  const [cities, setCities] = useState([])

  useEffect(() => {
    getEvents().then((data) => setEvents(data))
  }, [])

  useEffect(() => {
    getCities().then((data) => setCities(data))
  }, [])

  useEffect(() => {
    if (query !== '') {
      let filteredEvents = events.filter((e) => {
        if (new Date(query) == 'Invalid Date') {
          for (const eventCity of e.city) {
            const foundCity = cities.find((city) => {
              return city.id === eventCity.id
            })

            if (foundCity.name.toLowerCase().includes(query.toLowerCase())) {
              return true
            } else {
              return false
            }
          }
        } else {
          if (e.date == query) return true
          else return false
        }
      })
      setSearchedEvents(filteredEvents)
    } else {
      setSearchedEvents([])
    }
  }, [query])

  return (
    <>
      <article className="thehive">
        <div className="wherewhen">
          <label className="where">Where are we going?</label>
          <input
            placeholder="Where are you going?"
            onChange={(event) => setQuery(event.target.value)}
          ></input>
          <label className="where">When are we going?</label>
          <input type="date" onChange={(event) => setQuery(event.target.value)} />
          <button
            className="btn"
            onClick={() => {
              history.push({ pathname: '/events/new' })
            }}
          >
            Register New Event
          </button>
        </div>

        <article className="events">
          {searchedEvents.map((event) => {
            return (
              <section key={`event--${event.id}`} className="event">
                <img class="eventImg" src={event.imgAddress} />
                <div className="event__des">{event.name}</div>
                <div className="game__details">{event.description} </div>
                {event.city.map((city) => {
                  return <div className="game__details">{city.name} </div>
                })}

                <div className="event__time">
                  {event.date} at {event.time}{' '}
                </div>
                <a className="extraLink" target="_blank" href={event.extraLink}>
                  More Info
                </a>
              </section>
            )
          })}
        </article>
      </article>
    </>
  )
}
