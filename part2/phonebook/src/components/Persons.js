import Person from './Person'

const Persons = ({ persons, newFilter, removePersonOf }) => {
  return (
    <div>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map(person => {
            return (
              <Person 
                key={person.name} 
                person={person}
                removePersonOf={removePersonOf}
              />
            )
          })
      }
    </div>
  )
}

export default Persons
