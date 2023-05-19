import React, { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios
      .get('/api/test')
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="App">
      <h1>Welcome to the Budget App</h1>
    </div>
  )
}

export default App
