import {useRef, useState, useEffect} from 'react'

const Todo = ({list, removeItem, updateItem}) => {

  const [check, setCheck] = useState(false)
  const [editTitle, setEditTitle] = useState(list.title)

  //make delete button disabled until checkbox is checked
  const [isDisabled, setIsDisable] = useState (true)
  
  //set checkbox status upon page load
  useEffect(()=>{
    setCheck(list.completed)
    setIsDisable(!list.completed)
  },[list.completed])
  
  const checkRef=useRef()
  function handleCheck(e) {
    const isChecked = e.target.checked
    console.log(isChecked);
    setCheck(isChecked)
    //update the todo item in the parent component
    updateItem(list.id, editTitle, isChecked)
    // display or show delete button according to completed status
    setIsDisable(!isChecked)
    console.log(list);
  }

  const titleRef = useRef()
  // console.log(titleRef)

  const deleteRef = useRef()
  const todoRef = useRef()
  const [saveButton, setSaveButton] = useState(false)

  function handleEdit(e) {
    titleRef.current.style.display = "none"
    deleteRef.current.style.display = "none"
    todoRef.current.style.display = "none"
    setSaveButton(true)
  }

  function updateEdit(e) {
    setEditTitle(e.target.value)
    // console.log(e.target.value);
  }

  function updateTitle() {
    // console.log(editTitle);
    updateItem(list.id, editTitle, check)
    titleRef.current.style.display = "block"
    deleteRef.current.style.display = "block"
    todoRef.current.style.display = "block"
    setSaveButton(false)
  }


  return (
    <div>
       <label className='todoList'>
          <input ref={checkRef}type="checkbox" onChange={handleCheck} checked={check}/>
          <div ref={todoRef}>{list.title}</div>
          <button ref={titleRef} onClick={handleEdit}>Edit</button>
          <button ref={deleteRef} disabled={isDisabled} onClick={()=>removeItem(list.id)}>Delete</button>
          {saveButton && (
            <>
              <input type='text' placeholder={list.title} onChange={updateEdit}/>
              <button onClick={updateTitle}>Save</button> 
            </>
          )}
        </label> 
    </div>
  )
}

export default Todo