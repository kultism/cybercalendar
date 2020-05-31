import React, { useState } from "react"
import "antd/dist/antd.css"

import axios from "axios"
import { Calendar } from "./Calendar"
// axios.defaults.baseURL = 'http://167.172.101.116:8000/';
axios.defaults.baseURL = "https://cybercalendar.duckdns.org/"

function App() {
  return <Calendar />
}

export default App
