/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Weather = ({ Weather }) => {

  return (
    <>

    {/* Weather card that will be shown user request for a particularly city */}
      <span className="block max-w-sm p-6 mx-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-4">
        {/* City name */}
        <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{Weather.name}</h6>
        {/* Tempreture in celcius of the City */}
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{Weather.temp}° C</h5>
        {/* Situation of the Weather of City */}
        <p className="font-medium text-2xl text-gray-700 dark:text-gray-400">{Weather.desc}</p>
        {/* Level of Humidity of City */}
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-6">Humidity : {Weather.humidity}%</p>
        {/* Wind Speed in the City */}
        <p className="font-normal text-gray-700 dark:text-gray-400">Wind Speed : {Weather.wind_speed} m/s ESE</p>
        {/* Pressure in the city  */}
        <p className="font-normal text-gray-700 dark:text-gray-400">Pressure : {Weather.pressure} hPa</p>
      </span>
    </>
  )
}

// Exporting the Weather.jsx component

export default Weather