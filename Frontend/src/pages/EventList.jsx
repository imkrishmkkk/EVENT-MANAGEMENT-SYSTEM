"use client"

import { useState } from "react"
import Card from "../components/Card_temp"

const EventList = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Tech Conference 2023", date: "2023-08-15", location: "San Francisco, CA" },
    { id: 2, title: "Charity Gala", date: "2023-09-01", location: "New York, NY" },
    { id: 3, title: "Local Music Festival", date: "2023-09-15", location: "Austin, TX" },
  ])

  const [editingEvent, setEditingEvent] = useState(null)

  const handleEdit = (event) => {
    setEditingEvent(event)
  }

  const handleSave = (id, updatedEvent) => {
    setEvents(events.map((event) => (event.id === id ? updatedEvent : event)))
    setEditingEvent(null)
  }

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <Card>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Event List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Location</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td style={tableCellStyle}>
                {editingEvent && editingEvent.id === event.id ? (
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    style={inputStyle}
                  />
                ) : (
                  event.title
                )}
              </td>
              <td style={tableCellStyle}>
                {editingEvent && editingEvent.id === event.id ? (
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    style={inputStyle}
                  />
                ) : (
                  event.date
                )}
              </td>
              <td style={tableCellStyle}>
                {editingEvent && editingEvent.id === event.id ? (
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    style={inputStyle}
                  />
                ) : (
                  event.location
                )}
              </td>
              <td style={tableCellStyle}>
                {editingEvent && editingEvent.id === event.id ? (
                  <button onClick={() => handleSave(event.id, editingEvent)} style={buttonStyle}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(event)} style={buttonStyle}>
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  style={{ ...buttonStyle, backgroundColor: "#dc3545", marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

const tableHeaderStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
}

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
}

const inputStyle = {
  width: "100%",
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px",
}

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}

export default EventList

