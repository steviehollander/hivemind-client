import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { MyEventList } from "./event/MyEvents.js"
import { EditEvent } from "./event/EditEvent.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>

            <Route exact path="/events">
                <EventList />
            </Route>

            <Route exact path="/events/new">
                <EventForm />
            </Route>

            <Route exact path="/events/myevents">
                <MyEventList />
            </Route>
            <Route path="/events/edit/:eventId(\d+)">
                <EditEvent />
            </Route>

        </main>
    </>
}
