import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';


// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://jopuhrloekkmoytnujmb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
);

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function getSession() {
    const { user, session, error } = supabase.auth.getSession();
  
    if (error) {
      console.error('Oturum alınamadı:', error.message);
    } else if (user) {
      console.log('Giriş yapan kullanıcının bilgileri:', user);
    } else {
      console.log('Oturum bilgisi:', session);
    }
  }


  const handleSignIn = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        })

      if (error) {
        alert(error.message);
      } else {
        alert('Başarıyla giriş yaptınız. Anasayfaya yönlendiriliyorsunuz.', data);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
    await getSession();
    navigate('/');
  };

  return (
    <>
    <div className="signUpBackground">
        <div className='signUpForm'>
            <h2>Giriş Yap</h2>
            <div className="signUpMail">
                <h3>E-posta:</h3>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="signUpPassword">
                <h3>Şifre:</h3>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='signIn'>
                <Link to={`/signup`}>Bir hesabın yok mu? <b>Kayıt ol</b></Link>
            </div>
        <button onClick={handleSignIn}>Giriş Yap</button>
        </div>
    </div>
    </>
  );
};

export default SignInForm;