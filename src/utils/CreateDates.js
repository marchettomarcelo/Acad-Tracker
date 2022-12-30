const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const dateList = [];

for (let month = 0; month < months.length; month++) {
  const daysInMonth = new Date(2023, month + 1, 0).getDate(); // get the number of days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(2023, month, day);
    if (date.getMonth() === month) {
      dateList.push({
        dayOfWeek: days[date.getDay()],
        day: day,
        month: months[month],
        year: 2023,
      });
    }
  }
}

console.log(dateList);
