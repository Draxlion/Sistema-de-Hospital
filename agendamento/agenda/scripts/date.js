export function today() {
  const now = new Date();

  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    12
  );
}

export function addMonths(date, months) {
  const firstDayOfMonth = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + months,
    1,
    date.getHours()
  );
  const lastDayOfMonth = getLastDayOfMonthDate(firstDayOfMonth);

  const dayOfMonth = Math.min(date.getDate(), lastDayOfMonth.getUTCDate());

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + months,
    dayOfMonth,
    date.getHours()
  );
}

export function subtractMonths(date, months) {
  return addMonths(date, -months);
}

export function addDays(date, days) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + days,
    date.getHours()
  );
}

export function subtractDays(date, days) {
  return addDays(date, -days);
}

export function generateMonthCalendarDays(currentDate) {
  const calendarDays = [];

  const lastDayOfPreviousMonthDate = getLastDayOfMonthDate(
    subtractMonths(currentDate, 1)
  );

  const lastDayOfPreviousMonthWeekDay = lastDayOfPreviousMonthDate.getUTCDay();
  if (lastDayOfPreviousMonthWeekDay !== 6) {
    for (let i = lastDayOfPreviousMonthWeekDay; i >= 0; i -= 1) {
      const calendarDay = subtractDays(lastDayOfPreviousMonthDate, i);
      calendarDays.push(calendarDay);
    }
  }

  const lastDayOfCurrentMonthDate = getLastDayOfMonthDate(currentDate);
  for (let i = 1; i <= lastDayOfCurrentMonthDate.getUTCDate(); i += 1) {
    const calendarDay = addDays(lastDayOfPreviousMonthDate, i);
    calendarDays.push(calendarDay);
  }

  const totalWeeks = Math.ceil(calendarDays.length / 7);
  const totalDays = totalWeeks * 7;
  const missingDayAmount = totalDays - calendarDays.length;
  for (let i = 1; i <= missingDayAmount; i += 1) {
    const calendarDay = addDays(lastDayOfCurrentMonthDate, i);
    calendarDays.push(calendarDay);
  }

  return calendarDays;
}

export function isTheSameDay(dateA, dateB) {
  return dateA.getUTCFullYear() === dateB.getUTCFullYear() && dateA.getUTCMonth() === dateB.getUTCMonth() && dateA.getUTCDate() === dateB.getUTCDate();
}

export function generateWeekDays(date) {
  const weekDays = [];
  const firstWeekDay = subtractDays(date, date.getUTCDay());

  for (let i = 0; i <= 6; i += 1) {
    const weekDay = addDays(firstWeekDay, i);
    weekDays.push(weekDay);
  }

  return weekDays;
}

function getLastDayOfMonthDate(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    0,
    12
  );
}