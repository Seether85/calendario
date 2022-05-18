import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { routes, location } from './router/router'
import { Router } from '@tanstack/react-location'

// import { ReactLocationDevtools } from '@tanstack/react-location-devtools'
import Dashboard from './components/base/Dashboard'

function App() {
  return (
    <div className="App">
      <Router location={location} routes={routes}>
        <Dashboard />{' '}
      </Router>

      <ReactQueryDevtools initialIsOpen={false} />
      {/* <ReactLocationDevtools initialIsOpen={false} /> */}
    </div>
  )
}

export default App
