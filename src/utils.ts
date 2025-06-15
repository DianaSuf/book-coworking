import { seatColors } from "./const";
import { ITimeOption } from "./types/book-data";

export const generateTimeOptions = (): ITimeOption[] => {
  const options: ITimeOption[] = [];
  const start = 8 * 60;
  const end = 20 * 60;
  const interval = 15;

  for (let time = start; time <= end; time += interval) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    options.push({ label: formattedTime, value: formattedTime });
  }

  return options;
};

export const timeOptions: ITimeOption[] = generateTimeOptions();

export const formatDateForRequest = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export const paintSeat = (seatId: number, colorType: keyof typeof seatColors) => {
  const colors = seatColors[colorType];
  const unionSeat = document.querySelector<SVGElement>(`[id^="UnionSeat-${seatId}"]`);
  const rectangeSeat = document.querySelector<SVGElement>(`[id^="RectangeSeat-${seatId}"]`);
  const numberSeat = document.querySelector<SVGElement>(`[id^="${seatId}-"]`);

  if (unionSeat) {
    unionSeat.setAttribute('fill', colors.primary);
  }

  if (rectangeSeat) {
    rectangeSeat.setAttribute('fill', colors.secondary);
  }

  if (numberSeat) {
    numberSeat.setAttribute('fill', colors.primary);
  }
};

export function getCorrectWordEnding(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'нарушений';
  }

  if (lastDigit === 1) {
    return 'нарушение';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'нарушения';
  }

  return 'нарушений';
}

export function getCorrectNewEnding(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'новых';
  }

  if (lastDigit === 1) {
    return 'новое';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'новых';
  }

  return 'новых';
}

export function getCorrectNotificationEnding(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'уведомлений';
  }

  if (lastDigit === 1) {
    return 'уведомление';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'уведомления';
  }

  return 'уведомлений';
}
