import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Note from './components/Note';
import noteService from "./services/notes"
import phoneService from "./services/phone"
import Notification from './components/Nofication';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
  <div style={footerStyle}>
    <br />
    <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
  </div>
  )
}

function App(props) {
   /* ----------- 
  Currency app
   ----------- */
   /* const [value, setValue] = useState('')
   const [rates, setRates] = useState({})
   const [currency, setCurrency] = useState(null)

   useEffect(() => {
    console.log('effect run, currency is now', currency)

    if (currency) {
      console.log('fetching exchange rates..')
      axios.get(`https://open.er-api.com/v6/latest/${currency}`).then(response => {
        setRates(response.data.rates)
      })
    }
   }, [currency])

   const handleChange = (event) => {
    setValue(event.target.value)
   }

   const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
   } */

  /* ----------- 
  PhoneBook app
   ----------- */
  /* const [phones, setPhones] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
   
  useEffect(() => {
      phoneService.getAllPhone().then(initialPhones => {
        setPhones(initialPhones)
      })
  }, [])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const addContact = (e) => {
    e.preventDefault()
    const newPhone = {
      name,
      phone
    }
    const existingPhone = phones.find(phone  => phone.name === name)

     if (!existingPhone) {
      phoneService.createPhone(newPhone).then(savedPhone => {
        setPhones(phones.concat(savedPhone))
        setSuccess(`Added ${name}`)
        setTimeout(() => {
          setSuccess('')
        }, 1500)
      })
     } else {
      alert(`${name} is already added to Phonebook replace the old number with a new one`)
      const changedPhone = {
        ...existingPhone,
        phone: phone
      }
      phoneService.updatePhone(existingPhone.id, changedPhone).then(returnedData => {
        setPhones(phones.map(phone => phone.id !== existingPhone.id ? phone : returnedData))
      })
     }
      
  }

  const handlePhoneDelete = (id) => {
    console.log(id)
       const phoneUser = phones.find(phone => phone.id === id)
       alert(`Delete ${phoneUser.name} ?`)
       phoneService.deletePhone(id).then(removedData => {
        const removedPhone = phones.filter(phone => phone.id !== id)
        setPhones(removedPhone)
        // })  
       }).catch(error => {
          setError(`Information of ${phoneUser.name} has already been removed from server`)
       })
         
  }  */


  /* ----------- 
  Notes app
   ----------- */
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(notes => notes.important)

  console.log('notesToShow',notesToShow)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })

  }
    

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important: !note.important
    }
    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }).catch(error => {
      setErrorMessage(`the note ${note.content} was already deleted from server`)
      setTimeout(() => {
        setErrorMessage('')
      })
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }
  

  return (
   /*  <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange}/>
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div> */

    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote}/>
        <button>add</button>
      </form>
      
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <Footer />
    </div>

   /*   <div>
      {
        success && (<Notification message={success} />)
      }
      {
        error && (<Notification message={error}/>)
      }
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <label>name: <input value={name} onChange={handleNameChange}/></label>
        <label>number: <input value={phone} onChange={handlePhoneChange}/></label>
        <button>add</button>
      </form>
      <h2>Numbers</h2>
      {
        phones.map(phone => (
          <div key={phone.id}>
              <p>{phone.name} : {phone.phone}</p>
              <button onClick={() => handlePhoneDelete(phone.id)}>delete</button>
          </div>
         
        ))
      }

    </div>  */


  )
}

export default App;
