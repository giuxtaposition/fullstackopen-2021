import React from 'react'
import Country from './Country'

const Results = ({ countries, setFilteredCountries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (
    (countries.length > 2 && countries.length < 10) ||
    countries.length === 0
  ) {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={i}>
            {' '}
            {country.name}{' '}
            <button onClick={() => setFilteredCountries([country])}>
              Show
            </button>
          </li>
        ))}
      </ul>
    )
  } else {
    return <Country country={countries[0]}></Country>
  }
}

export default Results
