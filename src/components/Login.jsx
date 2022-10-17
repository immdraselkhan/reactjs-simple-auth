import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, signOut } from 'firebase/auth'
import app from '../firebase/firbase.init'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons'

const Login = () => {

  // Firbasae config
  const auth = getAuth(app);

  // Email state
  const [email, setEmail] = useState('');

  // Password state
  const [password, setPassword] = useState('');

  // Phone number state
  const [phoneNumber, setPhoneNumber] = useState('');

  // Otp state
  const [otp, setOtp] = useState('');

    // Get input email
    const inputEmail = (e) => {
      // Set to the email state
      setEmail(e.target.value);
    };

  // Get input password
  const inputPassword = (e) => {
    // Set to the password state
    setPassword(e.target.value);
  };

  // Get input phone number
  const inputPhoneNumber = e => {
    // Set to the phone number state
    setPhoneNumber(e.target.value)
  };

  // Get input otp
  const inputOtp = e => {
    // Set set to the otp state
    setOtp(e.target.value);
  };

  // Loggedin user state
  const [user, setUser] = useState('');

  // Alert
  const [alert, setAlert] = useState('');
  // Hiding the alert after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setAlert('');
    },3000);
  },[alert]);
  // Success alert CSS
  const success = 'border-green-900/10 bg-green-50 text-green-700 !block';
  // Warning alert CSS
  const warning = 'border-red-900/10 bg-red-50 text-red-700 !block';

  // Error alert
  const handleError = error => {
    // Show alert
    setAlert({'text': error.code, 'css': warning});
    // Handle errors here
    console.log(`Error code: ${error.code}\nError message: ${error.message}`);
  };

  // Modal state
  const [modal, setModal] = useState(false);

  // Modal handler
  const handleModal = () => {
    setModal(!modal);
    // Recaptcha
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  };

  // Google provider
  const googleProvider = new GoogleAuthProvider();
  // Github provider
  const githubProvider = new GithubAuthProvider();
  // Twitter provider
  const twitterProvider = new TwitterAuthProvider();

  // Popup signin with onclick handler
  const handlePopupSignin = (auth, provider) => {
    signInWithPopup(auth, provider)
      .then(result => {
        // The signed-in user info
        const user = result.user;
        // Set to the user state
        setUser(user);
        // Show alert
        setAlert({'text': 'Login successful', 'css': success});
        // Console log
        console.log(user);
      }).catch((error) => {
        // Handle errors here
        handleError(error);
    });
  };

  // Email signin with onclick handler
  const handleEmailSignin  = (email, password) => {
    // Prevent form default behavior
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // Set to the user state
        setUser(user);
        // Show alert
        setAlert({'text': 'Login successful', 'css': success});
        // Console log
        console.log(user);
      }).catch((error) => {
        // Handle errors here
        handleError(error);
    });
  };

  // Handle otp sending
  const handleOtp = () => {
    // Verifed recaptcha
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(confirmationResult => {
      // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code)
      window.confirmationResult = confirmationResult;
      // Show alert
      setAlert({'text': 'OTP han been sent', 'css': success});
    }).catch((error) => {
      // Handle errors here
      handleError(error);
    });
  };

  // Handle otp verfication and complete the phone signup
  const handlePhoneSignup = () => {
    confirmationResult.confirm(otp)
    .then(result => {
      // Signed in
      const user = result.user;
      // Set to the user state
      setUser(user);
      // Show alert
      setAlert({'text': 'Signup successful', 'css': success});
      // Close the modal
      setModal(false);
      // Console log
      console.log(user);
    }).catch((error) => {
      // Handle errors here
      handleError(error);
    });
  };

  // Sign-out with oneclick handler
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      // Show alert
      setAlert({'text': 'Sign-out successful', 'css': success});
      // Set empty to the user state
      setUser('');
    }).catch((error) => {
      // Handle errors here
      handleError(error);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 my-20">
      <div id="recaptcha-container"></div>
      <div className={`rounded-md border p-4 hidden ${alert && alert.css}`} role="alert">{alert && alert.text}</div>
      {user.uid &&
      <div className="flex flex-col justify-center max-w-xs mx-auto px-4 py-8 my-10 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
        <img src={user.photoURL ? user.photoURL : 'https://xsgames.co/randomusers/avatar.php?g=male'} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">{user.displayName ? user.displayName : 'No Name'}</h2>
            <p className="px-5 text-xs sm:text-base text-gray-600">{user.email ? user.email : (user.phoneNumber ? user.phoneNumber : 'No Name')}</p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md text-gray-800 hover:text-violet-600">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md text-gray-800 hover:text-violet-600">
              <FontAwesomeIcon icon={faDribbble} className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md text-gray-800 hover:text-violet-600">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
            </a>
            <a rel="noopener noreferrer" href="#" aria-label="Email" className="p-2 rounded-md text-gray-800 hover:text-violet-600">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
            </a>
          </div>
        </div>
        <button onClick={handleSignOut} type="submit" className="w-fit mx-auto px-5 py-2 mt-5 rounded-md bg-violet-600 text-gray-50">Log out</button>
      </div>}
      {!user.uid &&
      <div className="w-full max-w-md mx-auto px-4 py-8 my-10 rounded-md shadow sm:p-8 bg-gray-50 text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
        <p className="text-sm text-center text-gray-600">Dont have account?
          <Link to="signup" rel="noopener noreferrer" className="focus:underline hover:underline"> Sign up here.</Link>
        </p>
        <div className="my-6 space-y-4">
          <button onClick={() => handlePopupSignin(auth, googleProvider)} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
            <FontAwesomeIcon icon={faGoogle} className="w-6 h-6" />
            <p>Login with Google</p>
          </button>
          <button onClick={() => handlePopupSignin(auth, githubProvider)} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            <p>Login with GitHub</p>
          </button>
          <button onClick={() => handlePopupSignin(auth, twitterProvider)} aria-label="Login with Twitter" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
            <p>Login with Twitter</p>
          </button>
          <button onClick={handleModal} aria-label="Login with Twitter" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
            <FontAwesomeIcon icon={faMobile} className="w-6 h-6" />
            <p>Login with Phone</p>
          </button>
          {modal &&
          <div className="flex flex-col max-w-md gap-5 p-6 rounded-md shadow-md bg-gray-50 text-gray-800">
            <div className="flex items-center border-b border-violet-600 py-2">
              <input onBlur={inputPhoneNumber} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="tel" placeholder="+880 1753-203145" aria-label="Phone Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
              <button onClick={handleOtp} className="flex-shrink-0 bg-violet-600 text-sm text-white py-1 px-2 rounded" type="button">
                Send
              </button>
              <input onBlur={inputOtp} className={`appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none hidden ${phoneNumber && '!block'}`} type="number" placeholder="OTP" aria-label="OTP" />
            </div>
            <button onClick={handlePhoneSignup} type="submit" className="w-fit mx-auto px-5 py-2 rounded-md bg-violet-600 text-gray-50">Create Account</button>
          </div>}
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>
        <form noValidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid" data-bitwarden-watching="1">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Email address</label>
              <input onBlur={inputEmail} type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">Password</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
              </div>
              <input onBlur={inputPassword} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
            </div>
          </div>
          <button onClick={()=>handleEmailSignin(email, password)} type="submit" className="w-full px-8 py-3 rounded-md bg-violet-600 text-gray-50">Login</button>
        </form>
      </div>}
    </div>
  )
};

export default Login;