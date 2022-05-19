import React from 'react'
import { useCalendarEventList } from '../../hooks/useCalendarEventList'
import { UserCard } from '../users/UserCard'

export const CalendarEventList = () => {
  const calendarEventList = useCalendarEventList()

  if (calendarEventList.isLoading) {
    return <div>Fetching posts...</div>
  }

  if (calendarEventList.isError) {
    console.log(calendarEventList.error)
    return <div>Error while fetching calendar events</div>
  }

  // if (calendarEventList.isFetched) {
  // console.log(calendarEventList.data)
  // }

  return (
    <>
      {calendarEventList.data?.map((calendarEvent, index) => (
        <UserCard
          key={index}
          id={calendarEvent.id}
          title={`Event for ${calendarEvent.user_firstname} ${calendarEvent.user_lastname}`}
          firstname={calendarEvent.user_lastname}
          lastname={calendarEvent.data}
        />
      ))}
    </>
  )
}
