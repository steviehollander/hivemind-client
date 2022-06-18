export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`
        }
    })
        .then(response => response.json())
}



export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then(getEvents);
};




export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then(getEvents);
};




export const DeleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
        .then(getEvents);
};




export const getUserEvents = () => {
    return fetch("http://localhost:8000/events/my_events", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("hm_token")}`
        }
    })
        .then(response => response.json())
}




export const getEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



