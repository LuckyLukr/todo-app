import React, { useState } from "react";

export default function Form(props) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name.length === 0) { return alert('Type something!!!!')};
        props.addTask(name);
        setName('');
      }

    function handleChange(e) {
        setName(e.target.value);
    }

    return(
        <form onSubmit={handleSubmit} >
            <input 
                className='addTaskInput' 
                type="text" 
                placeholder='Add new task...'
                value={name}
                onChange={handleChange} />
            <button className='addTaskButton' type='submit' >Add task</button>
        </form>
    )
}