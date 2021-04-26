function diff(start, end) {
  start = start.split(':')
  end = end.split(':')
  const startDate = new Date(0, 0, 0, start[0], start[1], 0)
  const endDate = new Date(0, 0, 0, end[0], end[1], 0)
  let diff = endDate.getTime() - startDate.getTime()
  let hours = Math.floor(diff / 1000 / 60 / 60)
  diff -= hours * (1000 * 60 * 60)
  const minutes = Math.floor(diff / 1000 / 60)
  diff -= minutes * (1000 * 60)
  const seconds = Math.floor(diff / 1000)

  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0) hours = hours + 24

  return (
    (hours <= 9 ? '0' : '') +
    hours +
    ':' +
    (minutes <= 9 ? '0' : '') +
    minutes +
    ':' +
    (seconds <= 9 ? '0' : '') +
    seconds
  )
}

export default diff
