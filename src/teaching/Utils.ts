export function formatTimestampWithDay(timestamp: number, showTime = false) {
  const date = new Date(timestamp);
  const dayName = (day: number) => {
    switch (day) {
      case 1:
        return 'pondělí';
      case 2:
        return 'úterý';
      case 3:
        return 'středu';
      case 4:
        return 'čtvrtek';
      case 5:
        return 'pátek';
      case 6:
        return 'sobotu';
      default:
        return 'neděli';
    }
  };
  const d = date.getDay();
  const preposition = [3, 4].includes(d) ? 've' : 'v';

  if (showTime) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const minutes = date
      .getMinutes()
      .toLocaleString('cs-CZ', { minimumIntegerDigits: 2, useGrouping: false });
    return `${preposition} ${dayName(d)} ${day}. ${month}. (${date.getHours()}:${minutes})`;
  } else {
    return `${preposition} ${dayName(d)} ${date.getDate()}. ${date.getMonth() + 1}.`;
  }
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getDate()}. ${date.getMonth() + 1}.`;
}

export function comparator<T, U>(f: (x: T) => U): (a: T, b: T) => -1 | 0 | 1 {
  return (a, b) => {
    if (f(a) < f(b)) {
      return -1;
    }
    if (f(a) === f(b)) {
      return 0;
    }
    return 1;
  };
}
