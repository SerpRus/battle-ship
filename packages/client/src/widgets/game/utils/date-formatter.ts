const checkYear = (currentDate: Date, date: Date) => {
  if (currentDate.getFullYear() - date.getFullYear()) {
    return date.toString().substring(4, 15)
  }
  return date.toString().substring(4, 10)
}

const checkWeek = (currentDate: Date, date: Date) => {
  if (currentDate.getTime() - date.getTime() < 604800000) {
    return date.toString().substring(0, 3)
  }
  const formatedDate = checkYear(currentDate, date)
  return formatedDate
}

const checkDay = (date: Date) => {
  const currentDate: Date = new Date()
  let formatedDate = 'Today'
  if (currentDate.getDate() - date.getDate() > 1) {
    formatedDate = checkWeek(currentDate, date)
  } else if (currentDate.getDate() - date.getDate() === 1) {
    formatedDate = 'Yesterday'
  }
  return formatedDate
}

export const dateFormat = (date: Date) => {
  const time = date.toString().substring(15, 21)
  return checkDay(date) + time
}
