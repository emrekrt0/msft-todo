import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';
import supabase from './functions/supabase.jsx'


function SignUpForm() {
  const navigate = useNavigate();

  async function handleSignUp(e) {
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
        navigate('/signin');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
    
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
