import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import { HiveMind } from "./componets/HiveMind.js"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HiveMind />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

