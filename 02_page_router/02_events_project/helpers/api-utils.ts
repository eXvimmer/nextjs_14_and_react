export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export async function getAllEvents() {
  try {
    const res = await fetch(
      `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`,
    );
    const data = await res.json();
    const events: IEvent[] = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  } catch {
    return [];
  }
}

export async function getFeaturedEvents() {
  return (await getAllEvents()).filter((event) => event.isFeatured);
}

export async function getEventById(
  id: string | string[],
): Promise<IEvent | null> {
  return (await getAllEvents()).find((event) => event.id === id);
}

export async function getFilteredEvents(year: number, month: number) {
  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
