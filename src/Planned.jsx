import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js';
import { getSession } from "./Root";


const supabase = createClient(
    'https://jopuhrloekkmoytnujmb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzIzODg5MywiZXhwIjoyMDE4ODE0ODkzfQ.BKG_xrrxE5mqHIqkD3q0pVHyE4cXyE0ZhQ1YGiXl5-I'
  );

  export default function Important() {
    const [userID, setUserID] = useState();
    const [tasks, setTasks] = useState([]);
  
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
          .not('date', 'is', null)
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
        let todayDate = new Date().toISOString();

        if (!userID) {
            return;
        }

        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        let selectedDate;
        if (!formData.date) {
           selectedDate = todayDate;
        } else {
            selectedDate = formData.date;
        }
        try {
        const { data, error } = await supabase
        .from('todo')
        .insert({  
            todo: formData.todo,
            user_id: userID,
            important: false,
            date: selectedDate
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
            alert("Görevi eklendi");
            e.target.reset();
        }
     } catch (error) {
        console.error('Bir hata oluştu:', error.message);
    }
    }
    

    async function handleDelete(taskId) {
        try {
            const { error } = await supabase
                .from('todo')
                .delete()
                .eq('id', taskId);
    
            if (error) {
                alert("Görev silinirken bir hata oluştu.");
                console.error('Silme hatası:', error.message);
            } else {
                getTasks();
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error.message);
        }
    }

    async function changeImportant(taskId) {
        try {
        const { data, error } = await supabase
        .from('todo')
        .update({  
            important: true,
        })
        .eq('id', taskId)
        .select()

        if (error) {
            alert(error.message);
        } else {
            console.log(data);
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error.message);
    }}

    return(
        <div className="mainBackground">
            <div className="importantHeader">
                <div className="importantHeader-title">
                <svg fill="currentColor" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3C19.55 3 21 4.46 21 6.25v11.5c0 1.8-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 013 17.75V6.25C3 4.45 4.46 3 6.25 3h11.5zm1.75 5.5h-15v9.25c0 .97.78 1.75 1.75 1.75h11.5c.97 0 1.75-.78 1.75-1.75V8.5zm-11.75 6a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4.25 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-4.25-4a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4.25 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm4.25 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm1.5-6H6.25c-.97 0-1.75.78-1.75 1.75V7h15v-.75c0-.97-.78-1.75-1.75-1.75z" fill="currentColor"></path></svg>                    <h2>Planned</h2>
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
                            {/* <button className="dateButton" type="button">
                                <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg>
                            </button> */}
                            <input type="date" name="date" className="dateInput" />
                        </div>
                        <div className="reminderButton-container">
                            <button className="reminderButton" type="button">
                                <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a5.92 5.92 0 015.98 5.36l.02.22V11.4l.92 2.22a1 1 0 01.06.17l.01.08.01.13a1 1 0 01-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 01-5 0V15H4a1 1 0 01-.26-.03l-.13-.04a1 1 0 01-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0110 2zm1.5 13h-3v.15a1.5 1.5 0 001.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36V15zM10 3a4.9 4.9 0 00-4.98 4.38L5 7.6V11.5l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0010 3z" fill="currentColor"></path></svg>
                            </button>
                        </div>
                        <div className="repeatButton-container">
                            <button className="repeatButton" type="button">
                                <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 6.67a.5.5 0 01.3.1l.08.07.01.02A5 5 0 0113.22 15L13 15H6.7l1.65 1.65c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06-2.5-2.5a.5.5 0 01-.06-.63l.06-.07 2.5-2.5a.5.5 0 01.76.63l-.06.07L6.72 14h.14L7 14h6a4 4 0 003.11-6.52.5.5 0 01.39-.81zm-4.85-4.02a.5.5 0 01.63-.06l.07.06 2.5 2.5.06.07a.5.5 0 010 .56l-.06.07-2.5 2.5-.07.06a.5.5 0 01-.56 0l-.07-.06-.06-.07a.5.5 0 010-.56l.06-.07L13.28 6h-.14L13 6H7a4 4 0 00-3.1 6.52c.06.09.1.2.1.31a.5.5 0 01-.9.3A4.99 4.99 0 016.77 5h6.52l-1.65-1.65-.06-.07a.5.5 0 01.06-.63z" fill="currentColor"></path></svg>
                            </button>
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
                    <button className="baseAdd-icon" type="Button" aria-label="Add a task" tabIndex={"0"} onClick={() => handleDelete(task.id)}>
                    <svg fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="blue"></path></svg>
                    </button>
                    <ul>
                        <li className="baseAddInput-important">
                            <div className="whatTodo">{task.todo} {task.date ? <p className="taskDate themeBlue">{task.date}</p> : null } </div> {!task.important ? <div className="importantCheck"><button onClick={ () => changeImportant(task.id, task.important)}>💫</button></div> : <button onClick={ () => changeImportant(task.id, task.important)}><div className="importantCheck">⭐</div></button>}
                        </li>
                    </ul>
                </div>
            ))}
            </div>
        </div>
    )
}