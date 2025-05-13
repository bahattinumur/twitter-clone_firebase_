import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from './../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Eğer kaydolma modundaysa
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info('Your account has been created');
          navigate('/home');
        })
        .catch((err) => toast.error(err.message));
    } else {
      // Eğer giriş yapma modundaysa
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info('You have logged in to your account successfully');
          navigate('/home');
        })
        .catch((err) => {
          toast.error(err.message);
          setIsError(true);
        });
    }
  };

  // Sifre sıfırlama maili gönder
  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info('A password reset link has been sent to your email!');
    });
  };

  // Google ile gir
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success('You have logged in to your account with Google');
      navigate('/home');
    });
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="x" />
        </div>

        <h1 className="text-center font-bold text-xl">Join Twitter Today</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="google" />
          <span className="text-black whitespace-nowrap">
            Sign up with Google
          </span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Password</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </button>

          <p onClick={() => setIsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp ? 'Already have an account?' : 'You do not have an account? '}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? 'Sign in' : 'Sign up'}
            </span>
          </p>
        </form>

        {!isSignUp && isError && (
          <button
            onClick={sendEmail}
            className="text-center text-red-500 cursor-pointer"
          >
            Forgot password?
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
