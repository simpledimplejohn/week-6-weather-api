const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`

export const kelToFahr = (kelvins) => {
  return Math.round((kelvins - 273.15) * 9/5 + 32)
}