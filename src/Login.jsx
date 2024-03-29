import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import supabase from './functions/supabase.jsx'


function SignInForm() {
  const navigate = useNavigate(); 

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.target));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
      } else {
        await addNotification({
          theme: 'light',
          title: "Başarıyla giriş yaptınız.",
          subtitle: "Anasayfaya yönlendiriliyorsunuz.",
      })
        navigate('/myday');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
    await getSession();
    


  };

  async function getSession() {
    const { data: { user } } = await supabase.auth.getUser()
  
    if (user) {
      console.log('Giriş yapan kullanıcının bilgileri:', user);
    }
  }

  return (
    <>
      <div className="signUpBackground">
      <Notifications position='top-right'/>
        <div className='signUpForm'>
          <h2>Giriş Yap</h2>
          <form onSubmit={handleSignIn}>
            <div className="signUpMail">
              <h3>E-posta:</h3>
              <input type="email" name="email" />
            </div>
            <div className="signUpPassword">
              <h3>Şifre:</h3>
              <input type="password" name="password" />
            </div>
            <div className='signIn'>
              <Link to={`/signup`}>Bir hesabın yok mu? <b>Kayıt ol</b></Link>
            </div>
            <button type="submit">Giriş Yap</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
