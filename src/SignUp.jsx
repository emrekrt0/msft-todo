import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://jopuhrloekkmoytnujmb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
);

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.target));
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        }
      });

      if (error) {
        alert(error.message);
      } else {
        alert('Başarıyla kayıt oldunuz. Giriş sayfasına yönlendiriliyorsunuz.', data);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
    navigate('/signin');
  };

  return (
    <>
      <div className="signUpBackground">
        <div className='signUpForm'>
          <h2>Kayıt Ol</h2>
          <form onSubmit={handleSignUp}>
            <div className="signUpName">
              <h3>İsim:</h3>
              <input type="text" name="name" />
            </div>
            <div className="signUpMail">
              <h3>E-posta:</h3>
              <input type="email" name="email" />
            </div>
            <div className="signUpPassword">
              <h3>Şifre:</h3>
              <input type="password" name="password" />
            </div>
            <div className='signIn'>
              <Link to={`/signin`}>Zaten bir hesabın var mı? <b>Giriş yap</b></Link>
            </div>
            <button type="submit">Kayıt Ol</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
