import React from "react"
import Image from "next/image"
const baseUrl = "https://countryflagsapi.com/png/"
const Country = ({
  cityName,
  countryCode,
  population,
  showPopulation = true,
}) => {
  const imageUrl = baseUrl + countryCode.toLowerCase()
  return (
    <div className='mt-12 flex flex-col items-center justify-start space-y-2 px-5 text-center '>
      <div className='relative aspect-video h-24 w-full max-w-[20rem]'>
        <Image alt={`The flag of ${cityName}`} src={imageUrl} layout='fill' />
      </div>
      <h1 className='text-4xl font-semibold text-white'>
        {cityName}, {countryCode}
      </h1>

      {showPopulation ? (
        <div className='text-white'>
          <h2 className='text-3xl'>Population</h2>
          <span className='text-2xl'>{population.toLocaleString()}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Country
