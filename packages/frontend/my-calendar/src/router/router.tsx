import { ReactLocation, Route } from '@tanstack/react-location'
import { AddCard } from '../components/base/AddCard'
import { CalendarEventList } from '../components/calendarEvents/CalendarEventList'
import { User } from '../components/users/User'
import { UserList } from '../components/users/UserList'

export const routes: Route[] = [
  { path: '/', element: <div>Nothing to see here</div> },
  { path: '/events', element: <CalendarEventList /> },
  {
    path: '/users',
    children: [
      { path: '/', element: <UserList /> },
      {
        path: '/create',
        element: <AddCard />,
      },
      { path: ':id', element: <User /> },
      { path: '/:id/:action', element: <User /> },
    ],
  },
]

// Set up a ReactLocation instance
export const location = new ReactLocation()
