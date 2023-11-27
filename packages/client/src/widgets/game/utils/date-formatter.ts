export enum Day {
  TODAY = 'Today',
  YESTERDAY = 'Yesterday',
}

const checkDay = (timeDifferenceMonth: number) => {
  let formatedDate = Day.TODAY as string;
  if (timeDifferenceMonth === 1) {
    formatedDate = Day.YESTERDAY as string;
  }
  return formatedDate;
};

const checkWeek = (currentDate: Date, date: Date) => {
  const timeDifferenceMs = currentDate.getTime() - date.getTime();
  const timeDifferenceDay = currentDate.getDate() - date.getDate();
  const timeDifferenceMonth = currentDate.getMonth() - date.getMonth();
  if (timeDifferenceDay < 2 && !timeDifferenceMonth) {
    return checkDay(timeDifferenceMonth);
  }
  if (timeDifferenceMs < 604800000) {
    return date.toString().substring(0, 3);
  }
  return date.toString().substring(4, 10);
};

const checkYear = (date: Date) => {
  const currentDate: Date = new Date();
  const timeDifferenceYear = currentDate.getFullYear() - date.getFullYear();
  if (timeDifferenceYear) {
    return date.toString().substring(4, 15);
  }
  return checkWeek(currentDate, date);
};

export const dateFormat = (date: Date) => {
  const time = date.toString().substring(15, 21);
  return checkYear(date) + time;
};
