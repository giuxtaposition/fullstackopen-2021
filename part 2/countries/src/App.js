import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/Results'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    var tempCountries =
      search === ''
        ? []
        : countries.filter(country =>
            country.name.toLowerCase().includes(search.toLowerCase())
          )

    setFilteredCountries(tempCountries)
  }, [search, countries])

  return (
    <div className='App'>
      <Filter onChange={e => handleSearchChange(e)} value={search} />
      <Results
        countries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  )
}

export default App
