import { useState } from 'react'
import Header from './components/Header'
import LeftNavbar from './components/LeftNavbar'
import { Outlet } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jopuhrloekkmoytnujmb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
);

function App() {
  async function getSession() {
    const { data: { user } } = await supabase.auth.getUser()
  
    if (user) {
      console.log('Giriş yapan kullanıcının bilgileri:', user);
    }
  }
  getSession();
  return (
    <>
      <Header />
      <div className="mainContent">
        <LeftNavbar />
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
