import React from "react";

export default function FilterButton(props) {

    return(
        <div className="filterButtons">
               <button type="button" className="filterTaskButton" onClick={() => props.onShowAll()} >
                  Show all tasks
                </button>
                <button type="button" className="filterTaskButton" onClick={() => props.onShowIncompleted()} >
                   Show Active tasks
                </button>
                <button type="button" className="filterTaskButton" onClick={() => props.onShowCompleted()} >
                   Show Completed tasks
                </button><br />
                <span className='taskCounter' >Total tasks: {props.tasksNumber} </span>
            </div>
    )
}