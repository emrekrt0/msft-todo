import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js';
import { getSession } from "./Root";
import { useOutlet } from "react-router-dom";
import addNotification from "react-push-notification";
import supabase from './functions/supabase.jsx'
import emptyStars from './assets/static/emptyStars.svg'; 


  export default function Tasks() {
    const [userID, setUserID] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [tasks, setTasks] = useState([]);
    const [repeatNumber, setRepeatNumber] = useState(0);
    const [repeatDropdown, setRepeatDropdown] = useState(false);
    const [dataLength, setDataLength] = useState(0);
  
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
        getTasks();
      };

    
    
    supabase
  .channel('room1')
  .on('postgres_changes', { event: '*', schema: '*' }, handleInserts)
  .subscribe()
    

    useEffect(() => {
      if (userID !== null) {
        getTasks();
      }
    }, [userID]);
  

    async function getTasks() {
        if (!userID) {
            return;
        }
      try {
        const { data, error } = await supabase
          .from('todo')
          .select('*')
          .eq('user_id', userID)
          .is('list_id', null)
          .order('id', { ascending: false });
        if (error) {
          alert(error.message);
        } else {
          console.log(data);
          setTasks(data || []);
          setDataLength(data.length);
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
                subtitle: "You deleted a task from your list.",
                duration: 5000
              })
                getTasks();
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
                  title: `You changed the importance of a task`,
                  subtitle: `Important set to: ${!taskImportant ? 'Important' : 'Unimportant'}`,
                  duration: 5000
                })
                getTasks();
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error.message);
        }
    }
    
    function TaskResult() {
      return(
      <div className="mainBackground">
            <div className="importantHeader">
                <div className="importantHeader-title">
                <svg fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.55 2.53c.84-.7 2.06-.7 2.9 0l6.75 5.7c.5.42.8 1.05.8 1.71v9.8c0 .97-.78 1.76-1.75 1.76h-3.5c-.97 0-1.75-.79-1.75-1.75v-5.5a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25v5.5c0 .96-.78 1.75-1.75 1.75h-3.5C3.78 21.5 3 20.7 3 19.75v-9.8c0-.67.3-1.3.8-1.73l6.75-5.69zm1.93 1.15a.75.75 0 00-.96 0l-6.75 5.7a.75.75 0 00-.27.56v9.8c0 .14.11.26.25.26h3.5c.14 0 .25-.12.25-.25v-5.5c0-.97.78-1.75 1.75-1.75h3.5c.97 0 1.75.78 1.75 1.75v5.5c0 .13.11.25.25.25h3.5c.14 0 .25-.12.25-.25v-9.8c0-.23-.1-.44-.27-.58l-6.75-5.7z" fill="currentColor"></path></svg>
                <h2>Tasks</h2>
                </div>
            </div>
            <div className="tasks mt-50">
            {tasks.map((task) => (
                <div key={task.id} className="baseAdd addTask box-shadow mb-20 ts">
                    <span className="checkBox baseAdd-icon" onClick={() => handleDelete(task.id,task.repeat)} aria-label="Delete task">
                        <svg className="cBox" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="blue"></path></svg>
                        <svg className="checkBox-hover themeBlue" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z" fill="currentColor"></path></svg>
                    </span>
                        <ul>
                            <li className="baseAddInput-important">
                                <div className="whatTodo">{task.todo} 
                                {task.date ? <p className="taskDate themeBlue">{task.date}</p> : null } </div> 
                                <div className="impRepChecker"> 
                                    {task.repeat > 1 ? <p>Kalan tekrar: {task.repeat}</p> : ''}
                                    {!task.important ? <div className="importantCheck notFilled"><img src={emptyStars} onClick={ () => changeImportant(task.id,task.important)} title="Add to important"></img></div> 
                                    : <button onClick={ () => changeImportant(task.id, task.important)}><div className="importantCheck">⭐</div></button>}
                                </div>
                            </li>
                        </ul>
                    </div>
            ))}
            </div>
        </div>
      )
    }

    return(
        <>
        <TaskResult />
        </>
    )
}