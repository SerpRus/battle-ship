export enum Day {
  TODAY = 'Today',
  YESTERDAY = 'Yesterday',
}

const checkDay = (currentDate: Date, date: Date) => {
  let formatedDate = Day.TODAY as string;
  if (currentDate.getDate() - date.getDate() === 1) {
    formatedDate = Day.YESTERDAY as string;
  }
  return formatedDate;
};

const checkWeek = (currentDate: Date, date: Date) => {
  if (
    currentDate.getDate() - date.getDate() < 2 &&
    !(currentDate.getMonth() - date.getMonth())
  ) {
    return checkDay(currentDate, date);
  }
  if (currentDate.getTime() - date.getTime() < 604800000) {
    return date.toString().substring(0, 3);
  }
  return date.toString().substring(4, 10);
};

const checkYear = (date: Date) => {
  const currentDate: Date = new Date();
  if (currentDate.getFullYear() - date.getFullYear()) {
    return date.toString().substring(4, 15);
  }
  return checkWeek(currentDate, date);
};

export const dateFormat = (date: Date) => {
  const time = date.toString().substring(15, 21);
  return checkYear(date) + time;
};
