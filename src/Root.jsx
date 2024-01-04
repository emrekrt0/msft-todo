import { useState, createContext } from 'react'
import Header from './components/Header'
import LeftNavbar from './components/LeftNavbar'
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { Notifications } from 'react-push-notification';
import  supabase  from './functions/supabase.jsx'

export async function getSession() {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    console.log('Giriş yapan kullanıcının bilgileri:', user);
  }
}
export const SearchContext = createContext();

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
      alert('Kullanıcı girişi yapmadınız.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('todo')
        .select('*')
        .eq('user_id', userId)
        .ilike('todo', `%${searchText}%`);
  
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
    <SearchContext.Provider value={searchResults}>
      <Header onSearch={handleSearch}/>
      <div className="mainContent">
        <Notifications position='top-right'/>
        <LeftNavbar />
        <div id="detail">
        <Outlet searchResults={searchResults} />
        </div>
      </div>
      </SearchContext.Provider>
    </>
  )
}

export default App 
