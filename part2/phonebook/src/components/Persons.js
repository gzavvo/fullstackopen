import Person from './Person'

const Persons = ({ persons, newFilter }) => {
  return (
    <table>
      <tbody>
        {
          persons
            .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <Person person={person} />)
        }
      </tbody>
    </table>
  )
}

export default Persons
