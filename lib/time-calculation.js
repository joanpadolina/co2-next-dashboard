function diff(start, end) {
  start = start.split(':');
  end = end.split(':');
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * (1000 * 60 * 60);
  var minutes = Math.floor(diff / 1000 / 60);
  diff -= minutes * (1000 * 60);
  var seconds = Math.floor(diff / 1000);

  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0) hours = hours + 24;

  return (
    (hours <= 9 ? '0' : '') +
    hours +
    ':' +
    (minutes <= 9 ? '0' : '') +
    minutes +
    ':' +
    (seconds <= 9 ? '0' : '') +
    seconds
  );
}

export default diff