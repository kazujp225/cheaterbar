export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl?: string
  category: string[]
  createdAt: string
  updatedAt: string
}

// Local storage key
const EVENTS_KEY = 'cheetah_bar_events'

// Get all events
export const getEvents = (): Event[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(EVENTS_KEY)
  return stored ? JSON.parse(stored) : []
}

// Get single event
export const getEvent = (id: string): Event | null => {
  const events = getEvents()
  return events.find(event => event.id === id) || null
}

// Create event
export const createEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event => {
  const events = getEvents()
  const newEvent: Event = {
    ...eventData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  events.unshift(newEvent) // Add to beginning
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
  return newEvent
}

// Update event
export const updateEvent = (id: string, eventData: Partial<Event>): Event | null => {
  const events = getEvents()
  const index = events.findIndex(event => event.id === id)
  if (index === -1) return null
  
  events[index] = {
    ...events[index],
    ...eventData,
    id,
    updatedAt: new Date().toISOString()
  }
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
  return events[index]
}

// Delete event
export const deleteEvent = (id: string): boolean => {
  const events = getEvents()
  const filtered = events.filter(event => event.id !== id)
  if (filtered.length === events.length) return false
  
  localStorage.setItem(EVENTS_KEY, JSON.stringify(filtered))
  return true
}

// Get events by category
export const getEventsByCategory = (category: string): Event[] => {
  const events = getEvents()
  return events.filter(event => event.category.includes(category))
}

// Get upcoming events
export const getUpcomingEvents = (): Event[] => {
  const events = getEvents()
  const now = new Date()
  return events.filter(event => new Date(event.date) >= now)
}