import React from "react";

export default function Task(props) {
 
  return (
    <li className="todoStack">

      <div className="todoText">
          <label className="todo-label" >
            {props.completed ? <div>
                                <span className='doneText'>DONE</span><br />
                                <span className='lineThrough'>{props.name}</span>
                              </div> : props.name}
          </label>
      </div>

      <div className='askForDeleteContainer' style={{display: props.askForDelete ? 'block' : ""}}>
            <div className='askForDeleteSpan'>
              {!props.completed ? 
              <span><strong>THIS TASK IS NOT DONE YET!<br /> Do you really want to delete this task?</strong></span> :
              <span><strong>Do you really want to delete this task?</strong></span>
            }
            </div>
            <div className='askForDeleteButtonsContainer'>
              <button className='askForDeleteButton'
                      onClick={() => props.onDeleted(props.id)}> Yes
              </button>
              <button className='askForDeleteButton'
                      onClick={() => props.onAskForDelete(props.id)} >No
              </button>
            </div>
      </div>
      
      <div className='taskButtonsDiv'  >
          <button style={{textDecoration: props.completed ? 'line-through' : ''}}
                  className='taskButton' 
                  type='button' 
                  onClick={() => props.onCompleted(props.id)} > Complete 
          </button>
          <button className='taskButton' 
                  type='button' 
                  onClick={() => props.onAskForDelete(props.id)} > Delete
          </button>
          <button className='taskButton' 
                  type='button' 
                  onClick={() => props.onEdit(props.id)} > Edit
          </button>
        </div>
            
    </li>
  );
}
  
