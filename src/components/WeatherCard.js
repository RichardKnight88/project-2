import React, { useState, useEffect } from 'react'
import axios from 'axios'

function WeatherCard() {

  const [weather, setWeather] = useState(null)
  const [unixTime, setUnixTime] = useState('')


  // Spent time tracing a bug here. needed to add https:// - starting at api was working in insomnia
  const getData = async () => {
    try {
      const { data } = await axios.get('http://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=7a6b15eb3b34e8539da086e7593a3eee')
      console.log(data)
      console.log(data.list[0])
      setWeather(data.list[0])
      setUnixTime(data.list[0].dt)
      // had a bit of trouble getting this to update properly. I was initially using weather.dt to set this to state but the system delay in setting the correct thing to state meant that weather didn't have anything on state and therefore threw an error saying that it couldn't access .dt of undefined. Eventually clicked to grab it from the source instead of waiting for something to update then get it from there.

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    getData()

  }, [])


  console.log('UNIXTIME', unixTime)

  console.log('WEATHER', weather)
  const unixDate = new Date(unixTime * 1000)
  const date = unixDate.toDateString()
  const time = unixDate.toLocaleTimeString([], { timeStyle: 'short' })

  console.log(unixDate.toDateString())
  console.log(unixDate.toLocaleTimeString([], { timeStyle: 'short' }))



  return (

    <section className="section">
      <div className="container">
        <>
          {!weather ?

            <h2>Loading...</h2>

            :

            <>

              {/* <h1>HELLO WORLD</h1> */}
              <h1>{weather.name}</h1>
              <h2>{Math.round(weather.main.temp)}ºC</h2>
              <h2>{date} {time}</h2>

            </>
          }
        </>
      </div>
    </section>

  )

}

export default WeatherCard
