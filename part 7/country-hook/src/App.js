import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = name => {
  const [data, setData] = useState(undefined)
  const [found, setFound] = useState(undefined)

  useEffect(() => {
    if (name !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then(response => {
          console.log(response.data)
          setData(response.data[0])
          setFound(true)
        })
        .catch(() => {
          setFound(false)
        })
    }
  }, [name])

  return { found, data }
}

const Country = ({ country }) => {
  if (country.found === undefined) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const SearchBar = ({ setName }) => {
  const nameInput = useField('text')

  const fetch = e => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <form onSubmit={fetch}>
      <input {...nameInput} />
      <button type='submit'>find</button>
    </form>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)

  return (
    <div>
      <SearchBar setName={setName} />
      <Country country={country} />
    </div>
  )
}

export default App
