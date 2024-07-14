import {useRef, useState, useEffect} from 'react'

const Todo = ({list, removeItem, updateItem}) => {
  
  const checkboxRef = useRef()
  // console.log(checkboxRef.current.checked);
  const [check, setCheck] = useState(false)
  const [editTitle, setEditTitle] = useState(list.title)

  //make delete button disabled until checkbox is checked
  const [isDisabled, setIsDisable] = useState (true)
  
  //set checkbox status upon page load
  useEffect(()=>{
    if(list.completed) {
      setCheck(true)
      setIsDisable(false)
    }
  },[])

  
  function handleCheck(e) {
    setCheck(e.target.checked)
    // console.log(list);
    if(checkboxRef.current.checked) {
        list.completed = true
        setIsDisable(false)
    } else {
        list.completed = false
    }
  }



  const titleRef = useRef()
  // console.log(titleRef)

  const deleteRef = useRef()
  const [saveButton, setSaveButton] = useState(false)

  function handleEdit(e) {
    titleRef.current.style.display = "none"
    deleteRef.current.style.display = "none"
    setSaveButton(true)
  }

  function updateEdit(e) {
    setEditTitle(e.target.value)
    console.log(e.target.value);
  }

  function updateTitle() {
    // console.log(editTitle);
    updateItem(list.id, editTitle)
    titleRef.current.style.display = "block"
    deleteRef.current.style.display = "block"
    setSaveButton(false)
  }


  return (
    <div>
       <label className='todoList'>
          <input ref={checkboxRef} type="checkbox" onChange={handleCheck} checked={check}/>
          {list.title}
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