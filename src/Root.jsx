import { useState } from 'react'
import Header from './components/Header'
import LeftNavbar from './components/LeftNavbar'
import { useNavigate, Outlet } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

// import { onSearch } from './components/Header';

const supabase = createClient(
  'https://jopuhrloekkmoytnujmb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
);

export async function getSession() {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    console.log('Giriş yapan kullanıcının bilgileri:', user);
  }
}

function App() {
  const [userId, setUserId] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(() => {
        if (session) {
          setUserId(session.user.id);
        } else {
          console.log('no user');

        }
      }, 0);
    });
  }, []);

  async function handleSearch(searchText) {
    if (!userId) {
      console.error('Kullanıcı girişi yapmadınız.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('todo')
        .select('*')
        .eq('user_id', userId)
        .like('todo', `%${searchText}%`);
  
      if (error) {
        console.error('Arama hatası:', error.message);
        return;
      }
      console.log('Arama sonuçları:', data);
      setSearchResults(data);
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
  }

  getSession();
  return (
    <>
      <Header onSearch={handleSearch}/>
      <div className="mainContent">
        <LeftNavbar />
        <div id="detail">
        <Outlet searchResults={searchResults} />
        </div>
      </div>
    </>
  )
}

export default App 
