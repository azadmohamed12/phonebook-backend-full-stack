const PhonebookList = ({ persons, newFilter, onDelete}) => {
  return (
    <ol>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person => (
          
          <li key={person.id}>{person.name} {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
         
        ))
      }
    </ol>
  );
};

export default PhonebookList
