interface TimeRange {
  startTime: string;
  endTime: string;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function generateAvailableSlots(
  workingHours: TimeRange[],
  existingAppointments: TimeRange[],
  blockedSlots: TimeRange[],
  serviceDurationMinutes: number,
  slotIntervalMinutes: number = 30
): string[] {
  if (workingHours.length === 0) return [];

  const slots: string[] = [];

  for (const wh of workingHours) {
    const workStart = timeToMinutes(wh.startTime);
    const workEnd = timeToMinutes(wh.endTime);

    for (
      let slotStart = workStart;
      slotStart + serviceDurationMinutes <= workEnd;
      slotStart += slotIntervalMinutes
    ) {
      const slotEnd = slotStart + serviceDurationMinutes;

      const hasConflict = [...existingAppointments, ...blockedSlots].some(
        (occupied) => {
          const occStart = timeToMinutes(occupied.startTime);
          const occEnd = timeToMinutes(occupied.endTime);
          return slotStart < occEnd && slotEnd > occStart;
        }
      );

      if (!hasConflict) {
        slots.push(minutesToTime(slotStart));
      }
    }
  }

  return slots;
}
