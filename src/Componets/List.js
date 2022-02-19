import react from 'react'
import {nanoid} from 'nanoid'

export default function List(){
        
    const [list, setList] = react.useState( ()=> JSON.parse(localStorage.getItem(('lists'))) || [])
   

    react.useEffect(function(){
        localStorage.setItem('lists', JSON.stringify(list))
    })

    
    function addListItem(){
        // setList(prevList => prevList.push())
        let listItem = document.getElementById("to-do").value
        if(listItem === ''){
            return null
        }else{
            setList(prevList => ([...prevList, {id: nanoid(), value: listItem, isChecked: false}]))
            document.getElementById('to-do').value = ''
        }  
    }

    function clearListItems(){
        localStorage.clear()
        setList([])
    }

    function toggleListItem(id){
        setList(prevList => prevList.map(item => item.id === id ? {...item, isChecked : !item.isChecked} : {...item }))
    }

    const eachList =  list.map(item => <li className={item.isChecked ? 'check' : 'uncheck'} key={item.id}  onClick={()=>toggleListItem(item.id)}>{item.value}</li>)

    return(
        <div className='input-container'>
            <form action='submit'>
            <input type="text" placeholder="to-do"  name="to-do" id='to-do' />
            <button type='button' onClick={addListItem}>Add</button>
            <button type='button' onDoubleClick={clearListItems}>Clear</button>
            </form>

            <div className='list-display'>
                <ul className='u-list'>
                    {eachList}
                </ul>
            </div>
            {list.length !== 0 && <h6>Click on an item to check it off</h6>}
        </div>
    )
}