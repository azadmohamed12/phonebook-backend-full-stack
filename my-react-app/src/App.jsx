import { useState,useEffect } from 'react'
import Filter from './phonebook/filter'
import NameInput from './phonebook/naming'
import PhonebookList from './phonebook/personForm'
import nodeService from './services/node';
import Notification from './phonebook/messageAdding';
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setfilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)
  
useEffect( ()=>{nodeService.getAll()
 .then(personsData =>{
  console.log("fulfilled Data",personsData)
setPersons(personsData)
 }).catch(error =>{
  console.log("erorr",error)
 })},[])


const addPerson = (event) => {
  event.preventDefault();
  if (newName.trim() === "") {
    alert("please add name.")
    return
  }
  const nameExist = persons.find((person) => {
    return person.name.toLowerCase() === newName.toLowerCase()
  })
  if (nameExist) {
   const existedPerson = window.confirm(`${newName} is already added to phonebook, replace the old number with new one`)
   if (existedPerson){
  const updatedData = {...nameExist, number:newNumber}
nodeService
.update(nameExist.id, updatedData)
.then((returnedData)=>{
    console.log("updated contact", returnedData)
  setPersons((prevPerson)=> prevPerson.map((p)=> p.id !== nameExist.id ? p : returnedData)
)
setNewName("")
setNewNumber("")
setAddMessage(`you change the new number in his old number ${returnedData.name}`)
  setTimeout(()=>{
setAddMessage(null)
  },5000)
  })
  .catch(error =>{
    alert(`Error updating: ${newName} may have already been removed from the server.`);
          console.error("Update error", error);
  setAddMessage(`Error updating: ${newName} may have already been removed from the server.`)
  })
 
   }
  return  
  }
  const newObj = {
    name: newName,
     //id: Math.max(0, ...persons.map(p => Number(p.id))) + 1,
     number: newNumber
  }
  // this causes error in appearing name ui two times and effect key = "id"
  //setPersons(persons.concat(newObj));
  setNewName("")
  setNewNumber("")
  
nodeService.create(newObj)
.then(personsData =>{
    console.log("fulfilled", personsData)
     setPersons(per=> per.concat(personsData)
     );
    setNewName("")
  setNewNumber("")
   setAddMessage(`you added your contact ${personsData.name}`)
  setTimeout(()=>{
setAddMessage(null)
  },5000)
  }).catch(error=>{
   console.log('error of adding new Contact',error)
   setAddMessage(`❌ error of adding new ${newObj.name}`)
   setTimeout(()=>{
    setAddMessage(null)
   },5000)
  })
}

const DeleteBtn = (id) =>{
const person = persons.find((p)=> String(p.id) === String(id))
if (!window.confirm(`are you sure you want delete this contact ${person?.name}` )) return;
nodeService.removing(id)
.then(()=>{
  setPersons((personsData=> personsData.filter((p)=> String(p.id) !==String(id))))
  console.log(`delete this person ${id}`)
})
.catch(error =>{
  console.log("Error deleting",error)
})
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage}/>
      <Filter value={newFilter} onChange={e => setfilter(e.target.value)} />
      <NameInput
        newName={newName}
        newNumber={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
       <PhonebookList persons={persons} newFilter={newFilter} onDelete ={DeleteBtn} />
    </div>
  )
}


export default App 


