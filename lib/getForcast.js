// https://github.com/voorhoede/co2smartcharging-app/pull/3/files

const { DateTime } = require('luxon')
const range = (start, end) =>
  new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
const sum = (values) => values.reduce((total, value) => total + value, 0)
const average = (values) => sum(values) / values.length

export default function getForecast(forecast) {
  const hoursPerTimeslot = 1
  const zone = 'Europe/Amsterdam'
  const totalHours = 24

  const timeslots = range(0, totalHours - 1).map((index) => {
    const items = forecast.slice(index, index + hoursPerTimeslot)
    const carbonIntensity = average(items.map((item) => item._value))
    const datetimeStart = DateTime.fromISO(items[0]._time, { zone })
    const datetimeEnd = DateTime.fromISO(items[hoursPerTimeslot - 1]._time, {
      zone
    }).plus({ hours: 1 })
    const dayLabel =
      DateTime.local().toISODate() === datetimeStart.toISODate()
        ? 'today'
        : 'tomorrow'
    const label = `${datetimeStart.toFormat('HH:mm')} - ${datetimeEnd.toFormat(
      'HH:mm'
    )}`
    return {
      carbonIntensity,
      datetimeStart: datetimeStart.toISO(),
      datetimeEnd: datetimeEnd.toISO(),
      dayLabel,
      label
    }
  })

  const max = Math.max(...timeslots.map((timeslot) => timeslot.carbonIntensity))

  return timeslots.map((timeslot) => ({
    ...timeslot,
    savings: Math.round(((max - timeslot.carbonIntensity) / max) * 100)
  }))
}
