import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSession } from "./Root";
import addNotification from "react-push-notification";
import emptyStars from './assets/static/emptyStars.svg';
import supabase from './functions/supabase.jsx'

export default function List() {
    const [userID, setUserID] = useState();
    const [tasks, setTasks] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [repeatNumber, setRepeatNumber] = useState(0);
    const [repeatDropdown, setRepeatDropdown] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [listName, setListName] = useState('');
    const { id } = useParams();

    const scheduleNotification = () => {
      // Schedule your notification here
      console.log(`Notification scheduled for ${dateTime}`);
    };
  
    useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) => {
        setTimeout(() => {
          if (session) {
            setUserID(session.user.id);
          } else {
            console.log('no user');

          }
        }, 0);
      });
    }, []);
  
    const handleInserts = (payload) => {
        console.log('Change received!', payload);
        getTasks(id);
      };

    supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: '*' }, handleInserts)
    .subscribe()
    

    useEffect(() => {
      if (userID !== null) {
        getTasks(id);
        getListName(id);
      }
    }, [userID, id]);
    
    async function getListName(id) {
        try {
            const { data, error } = await supabase
            .from('list')
            .select('*')
            .eq('id', id)
            .single();
            if (error) {
                alert(error.message);
            } else {
                console.log(data);
                setListName(data.list_name);
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error.message);
        }
    }

    async function getTasks(id) {
        if (!userID) {
            return;
        }
      try {
        const { data, error } = await supabase
          .from('todo')
          .select('*')
          .eq('user_id', userID)
          .eq('list_id', id)
          .order('id', { ascending: false });
  
        if (error) {
          alert(error.message);
        } else {
          console.log(data);
          setTasks(data || []);
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error.message);
      }
    }

    async function handleSendTask(e) {
        if (!userID) {
            return;
        }
        const repeatNum = e.target.repeat.value;
        if (!repeatNum) {
            setRepeatNumber(0);
        } else {
            setRepeatNumber(repeatNum);
            console.log(repeatNumber);
        }
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        try {
        const { data, error } = await supabase
        .from('todo')
        .insert({  
            todo: formData.todo,
            user_id: userID,
            important: false,
            date: null,
            repeat: repeatNum,
            list_id: id,
        })
        .select()

        if (error) {
            if (error.code === "23505") {
                alert("Bu görev zaten var");
            } else {
            alert(error.message);
            console.log(error.message); 
            }
        } else {    
            await addNotification({
                title: 'Your task has been added',
                subtitle: 'You added a task to your list.',
                message: `${formData.todo}`,
                backgroundTop: '#2564cf',
                backgroundBottom: '#0f2e64', 
                colorTop: 'white', 
                colorBottom: 'white',  
            });
            
            e.target.reset();
        }
     } catch (error) {
        console.error('Bir hata oluştu:', error.message);
    }
    }
    

    async function handleDelete(taskId, repeat) {
        if (repeat > 1) {
            const { data, error } = await supabase
            .from('todo')
            .update({ repeat: repeat - 1 })
            .eq('id', taskId)
            .select();
        } else {
        try {
            const { error } = await supabase
                .from('todo')
                .delete()
                .eq('id', taskId);
            if (error) {
                alert("Görev silinirken bir hata oluştu.");
                console.error('Silme hatası:', error.message);
            } else {
                addNotification({
                    theme: 'light',
                    title: "Your task has been deleted",
                    subtitle: "You deleted a task from your important list.",
                  })
                getTasks(id);
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error.message);
        }
    }}

    async function changeImportant(taskId, taskImportant) {
        try {
        const { data, error } = await supabase
        .from('todo')
        .update({  
            important: !taskImportant,
        })
        .eq('id', taskId)
        .select()

        if (error) {
            alert(error.message);
        } else {
            addNotification({
                theme: 'light',
                title: "Your task successfully changed",
                subtitle: `Your task successfully changed to ${taskImportant ? 'unimportant' : 'important'}`,
            })
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error.message);
    }}

    const nativeNotifaction = () => {
        addNotification({
            native: true,
            title: 'Reminder has been activated',
            message: "You'll be reminded in 5 minutes"
        });
        setTimeout(() => {
            addNotification({
                native: true,
                title: 'Reminder',
                message: 'Task reminder'
            });
        },300000)
    }

    function handleRepeatStyle() {
            setRepeatDropdown(!repeatDropdown);
    }
    
    function handleEditTodo (e) {
        setEditButton(!editButton);
        console.log(editButton);
    }
    async function sendNewTodo(e,taskId) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        try {
            const { data, error } = await supabase
            .from('todo')
            .update({  
                todo: formData.editedTodo,
            })
            .eq('id', taskId)
            .select()
    
            if (error) {
                alert(error.message);
            } else {
                setEditButton(!editButton);
                addNotification({
                    theme: 'light',
                    title: "Your task successfully edited",
                    subtitle: `Your task successfully edited to ${formData.editedTodo}`,
                })
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error.message);
        }}
    

    return(
        <div className="mainBackground">
            <div className="importantHeader">
                <div className="importantHeader-title">
                <svg fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z" fill="currentColor"></path></svg>
                    <h2>{listName}</h2>
                </div>
            </div>
            <div className="addTaskParent">
                <form onSubmit={handleSendTask} method="POST">
                <div className="baseAdd addTask">
                    <button className="baseAdd-icon" type="Button" aria-label="Add a task" tabIndex={"0"}>
                    <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="blue"></path></svg>
                    </button>
                    <input className="baseAddInput-important" type="text" maxLength={"255"} placeholder="Add a task" tabIndex={"0"} autoComplete="off" name="todo" disabled={!userID}/>
                </div>
                <div className="choices">
                    <div className="taskCreation-entrybar">
                        <div className="dateButton-container">
                            <input type="date" name="date" className="dateInput" title="Tarih ekle"/>
                        </div>
                        <div className="reminderButton-container">
                            <button className="reminderButton" type="button" title="5 Dakika sonra anımsat" onClick={nativeNotifaction}>
                                <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a5.92 5.92 0 015.98 5.36l.02.22V11.4l.92 2.22a1 1 0 01.06.17l.01.08.01.13a1 1 0 01-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 01-5 0V15H4a1 1 0 01-.26-.03l-.13-.04a1 1 0 01-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0110 2zm1.5 13h-3v.15a1.5 1.5 0 001.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36V15zM10 3a4.9 4.9 0 00-4.98 4.38L5 7.6V11.5l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0010 3z" fill="currentColor"></path></svg>
                            </button>
                        </div>
                        <div className="repeatButton-container">
                            <button className="repeatButton" type="button" title="Tekrarlayıcı ekle" onClick={handleRepeatStyle}>
                                <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6.67a.5.5 0 01.3.1l.08.07.01.02A5 5 0 0113.22 15L13 15H6.7l1.65 1.65c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06-2.5-2.5a.5.5 0 01-.06-.63l.06-.07 2.5-2.5a.5.5 0 01.76.63l-.06.07L6.72 14h.14L7 14h6a4 4 0 003.11-6.52.5.5 0 01.39-.81zm-4.85-4.02a.5.5 0 01.63-.06l.07.06 2.5 2.5.06.07a.5.5 0 010 .56l-.06.07-2.5 2.5-.07.06a.5.5 0 01-.56 0l-.07-.06-.06-.07a.5.5 0 010-.56l.06-.07L13.28 6h-.14L13 6H7a4 4 0 00-3.1 6.52c.06.09.1.2.1.31a.5.5 0 01-.9.3A4.99 4.99 0 016.77 5h6.52l-1.65-1.65-.06-.07a.5.5 0 01.06-.63z" fill="currentColor"></path></svg>
                            </button>
                            <select className={`repeatSelect ${repeatDropdown ? '' : 'none'}`} name="repeat" title="Tekrarlayıcı ekle">
                                <option value="0" defaultValue={0}>0</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    <div className="addButton-container">
                        <button type="submit" disabled={!userID}>Add</button>
                    </div>
                </div>
                </form>
            </div>

            <div className="tasks">
            {tasks.map((task) => (
                <div key={task.id} className="baseAdd addTask box-shadow mb-20 ts">
                    <span className="checkBox baseAdd-icon" onClick={() => handleDelete(task.id,task.repeat)} aria-label="Delete task">
                        <svg className="cBox" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="blue"></path></svg>
                        <svg className="checkBox-hover themeBlue" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z" fill="currentColor"></path></svg>
                    </span>
                    <ul>
                        <li className="baseAddInput-important">
                            <div className="whatTodo">{!editButton ? task.todo : 
                                <form onSubmit={ (e) => sendNewTodo(e, task.id)}>
                                    <input className="baseAddInput-important" type="text" maxLength={"255"} placeholder="Add a task" tabIndex={"0"} autoComplete="off" name="editedTodo" disabled={!userID} defaultValue={task.todo}/>
                                </form>}
                            </div>  
                                <div className="impRepChecker"> 
                                    <div className="editTodo">
                                        <button onClick={() => {handleEditTodo(task.id)}}>🖋️</button>
                                    </div> 
                                    {task.repeat > 1 ? <p>Kalan tekrar: {task.repeat}</p> : ''} 
                                    {!task.important ? <div className="importantCheck"><img src={emptyStars} onClick={() => changeImportant(task.id,task.important)} title="Add to important"></img></div> : <button onClick={ () => changeImportant(task.id, task.important)}><div className="importantCheck">⭐</div></button>} </div>
                        </li>
                    </ul>
                </div>
            ))}
            </div>
        </div>
    )
}
