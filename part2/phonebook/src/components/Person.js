const Person = ({ person, removePersonOf }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number} 
      <button onClick={() => removePersonOf(person.id)}>delete</button>
    </div>
  )
}

export default Person
