import React from 'react'
import './Card.css';

const Card = (props) => {
    const deleteMe = () => {
        // console.log("hello")
        props.delete(props.id);
    }
    const editMe = () => {
        // console.log("hello world")
        props.edit(props.id);
    }
  return (
    <div className='cardBox'>
        <p><strong>{props.title}</strong></p>
        <p className='content'>{props.para}</p>
        <div className="button">
            <button onClick={editMe}>
                <img src="https://cdn-icons-png.flaticon.com/512/61/61456.png" alt="" width={20} height={20} />
            </button>

            <button onClick={deleteMe}>
                <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="" width={20} height={20} />
            </button>
        </div>
    </div>
  )
}

export default Card