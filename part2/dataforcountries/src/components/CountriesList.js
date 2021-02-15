import Country from './Country'

const CountriesList = ({ countries, newFilter }) => {
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log('filtered list: ', filteredCountries)

  if (newFilter === '') {
    return false
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <table>
        <tbody>
          {
            filteredCountries
              .map(country => {
                return (
                  <tr key={country.name}><td>{country.name}</td></tr>
                )
              })
          }
        </tbody>
      </table>
    )
  } else if (filteredCountries.length <= 0) {
    return (
      <div>
        No matches
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  }
}

export default CountriesList
