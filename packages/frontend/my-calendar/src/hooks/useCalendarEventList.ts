import { useQuery } from 'react-query'
import { DB } from '../DB'

import { CalendarEventType } from '../types/CalendarEventType'

async function fetchEvents() {
  const response = await fetch(`${DB.url}/api/events`)
  const events: CalendarEventType[] = await response.json()
  return events
}

export const useCalendarEventList = () =>
  useQuery('events', fetchEvents, {
    staleTime: 1000,
    retry: false,
  })
