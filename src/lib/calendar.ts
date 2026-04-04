export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string; // ISO date string
  end: string;
  location: string;
  isImportant: boolean;
  isCoffeeHour: boolean;
  htmlLink: string;
}

const IMPORTANT_PREFIX = '[Important]';
const COFFEE_HOUR_PREFIX = '[Coffee Hour]';

/**
 * Fetches events from a public Google Calendar using an API key.
 * Events with "[Important]" in the title are flagged for the highlights section.
 */
export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const apiKey = import.meta.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = import.meta.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    console.warn('Google Calendar not configured — GOOGLE_CALENDAR_API_KEY and GOOGLE_CALENDAR_ID are required.');
    return [];
  }

  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  // Fetch 6 months of events
  const timeMax = new Date(now.getFullYear(), now.getMonth() + 6, 0).toISOString();

  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '100',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Google Calendar API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    const items: any[] = data.items || [];

    return items.map((item) => {
      let title = item.summary || 'Untitled Event';
      const isImportant = title.includes(IMPORTANT_PREFIX);
      const isCoffeeHour = title.includes(COFFEE_HOUR_PREFIX);

      if (isImportant) title = title.replace(IMPORTANT_PREFIX, '').trim();
      if (isCoffeeHour) title = title.replace(COFFEE_HOUR_PREFIX, '').trim();

      return {
        id: item.id,
        title,
        description: item.description || '',
        start: item.start?.dateTime || item.start?.date || '',
        end: item.end?.dateTime || item.end?.date || '',
        location: item.location || '',
        isImportant,
        isCoffeeHour,
        htmlLink: item.htmlLink || '',
      };
    });
  } catch (err) {
    console.error('Failed to fetch Google Calendar events:', err);
    return [];
  }
}
