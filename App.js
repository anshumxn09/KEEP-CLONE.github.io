import React, { useState, useEffect } from 'react'
import Header from './Header'
import Card from './Card'
import "./Header.css";

const getLocalStorage = () => {
  const lists = localStorage.getItem("myNotes")

  if(lists){
    return JSON.parse(lists);
  }
  return[];
}
const App = () => {
  const [addItem , setAddItem] = useState(getLocalStorage());
  const [saveData, setData] = useState({
    title:"",
    para:""
  });
  const [edit, setEdit] = useState(-1);
  const inputEvent = (event) => {
      const {name, value} = event.target;
      setData((prevData) => {
        return {
          ...prevData,
          [name] : value,
        }
      })
  }

  const AddEvent = () => {
    if (edit !== -1){
      setAddItem(addItem.map((currElem, index) => {
        if (index === edit) {
          return { title : saveData.title, para : saveData.para}
        }
        return currElem;
      }))
      setEdit(-1);
    }
    else if (saveData.title !== "" && saveData.para !== ""){
    setAddItem((prevData) => {
      return [...prevData, saveData];
    })
  }
   setData({
    title: "",
    para: ""
   })
  }

  const onDelete = (id) => {
    setAddItem((prevData) => 
      prevData.filter((currElem, index) => {
        return index !== id;
      })
    );
  };

const editMyData = (id) => {
  setEdit(id);
  setData(
    addItem.find((currElem, index) => {
      return index===id
    })
  )
}

useEffect(() => {
  localStorage.setItem("myNotes", JSON.stringify(addItem));
}, [addItem]);

  return (
    <div className='mainBody' id="textBox">
      <Header/>
      <div className="contentContainer">
        <div className="actualBox">
          <input type="text" name="title" placeholder="Title" value={saveData.title}className='tochange' onChange={inputEvent}/>
          <textarea name="para" id="note" cols="30" rows="10" value={saveData.para} placeholder='Write a note' onChange={inputEvent}></textarea>
          <button className="add" onClick={AddEvent}>+</button>
        </div>
      </div>

      <div className="toGetContent"> 
      {
        addItem.map((currElem, index) => {
          return <Card key={index} id={index} title={currElem.title} para={currElem.para} delete={onDelete} edit={editMyData} setMe={setEdit}/>
        })
      }
      </div>
    </div>
  )
}

export default App