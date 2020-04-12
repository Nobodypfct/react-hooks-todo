import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Form = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()
        
        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Заметка была создана','success')
            }).catch((err) => {
                alert.show('Что-то пошло не так','danger')
            })
            setValue('')
        } else {
            alert.show('Введите название заметки')
        }
        console.log(alert.show)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите название заметки"
                  value={value}
                  onChange={event => setValue(event.target.value)}
                />
            </div>
        </form>
    )
}