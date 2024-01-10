import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const parseReadableDate = (inputDate: string) => {
  const now = dayjs();
  const date = dayjs(inputDate);
  const difference = now.diff(date, 'day');
  return difference < 4 ? date.fromNow() : date.format('HH:mm · DD MMMM YYYY');
};
