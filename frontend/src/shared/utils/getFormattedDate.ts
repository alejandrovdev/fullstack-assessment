import { format, intervalToDuration } from 'date-fns';

const getFormattedDate = (date: Date) => {
  const dateFormatted = format(date, 'MMM d, yyyy');

  const duration = intervalToDuration({ start: date, end: new Date() });

  const { years = 0, months = 0, days = 0 } = duration;

  const durationFormatted = `${years}y - ${months}m - ${days}d`;

  return `${dateFormatted} (${durationFormatted})`;
};

export default getFormattedDate;
