type DueStatus = 'Far' | 'Near' | 'Passed';

export function getDueStatus(due: number): DueStatus {
  const dayDiff = Math.ceil((due - Date.now()) / (1000 * 60 * 60 * 24));
  if (dayDiff < 0) {
    return 'Passed';
  } else if (dayDiff <= 3) {
    return 'Near';
  } else {
    return 'Far';
  }
}

export function getDueStatusStyle(due: number): 'orange' | 'green' | 'gray' {
  const status = getDueStatus(due);
  if (status === 'Passed') {
    return 'gray';
  } else if (status === 'Near') {
    return 'orange';
  } else {
    return 'green';
  }
}

export function colorToAccent(color: 'blue' | 'green' | 'gray' | 'orange') {
  switch (color) {
    case 'blue':
      return 'bg-blue-500';
    case 'gray':
      return 'bg-gray-500';
    case 'orange':
      return 'bg-orange-500';
    case 'green':
      return 'bg-green-500';
  }
}
