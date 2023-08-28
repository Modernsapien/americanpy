
// import React, { useState } from 'react';
// import styles from './LoginPage.css';
// import blob from './blob.png';

// const LoginPage = () => {
//   const [isSignIn, setIsSignIn] = useState(true);

//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//   };

//   return (
//     <div className={styles.containerWrapper}>
//           <div className="background-login">
//       <img className='blob' src={blob} alt="Waves" />
//     </div>
//     <div className="container-wrapper">
//       <div className="top">
//         <div className="logo"></div>
//       </div>
//       <form id="signin-form" className="signin-form" action="">
//         <div className="container sign">
//           <h1>{isSignIn ? 'Log in' : 'Sign up'}</h1>
//           <p>
//             Please fill in this form to {isSignIn ? 'log in' : 'create an account'}.
//           </p>
//           <br />
//           <label htmlFor="username">User Name</label>
//           <input
//             id="username"
//             className="text-box"
//             type="text"
//             placeholder="Enter Name"
//             name="username"
//             required
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             required
//           />
//           {isSignIn ? null : (
//             <div>
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm Password"
//                 name="confirmPassword"
//                 required
//               />
//             </div>
//           )}
//           <label>
//             <input type="checkbox" checked="checked" name="remember" /> Remember me
//           </label>
//           <div className="submit">
//             <button type="submit" className="signinBtn">
//               {isSignIn ? 'Log in' : 'Sign up'}
//             </button>
//           </div>
//         </div>
//         <p className="inline-p">
//           {isSignIn ? "Not a member? " : "Already have an account? "}
//           <span className='signup' onClick={toggleForm}>
//             {isSignIn ? 'Sign up' : 'Log in'}
//           </span>
//         </p>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import styles from './LoginPage.css';
// import blob from './blob.png';

// const LoginPage = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//   };


//   return (
//     <div className={styles.containerWrapper}>
//           <div className="background-login">
//       <img className='blob' src={blob} alt="Waves" />
//     </div>
//     <div className="container-wrapper">
//       <div className="top">
//         <div className="logo"></div>
//       </div>
//       <form id="signin-form" className="signin-form" action="">
//         <div className="container sign">
//           <h1>{isSignIn ? 'Log in' : 'Sign up'}</h1>
//           <p>
//             Please fill in this form to {isSignIn ? 'log in' : 'create an account'}.
//           </p>
//           <br />
//           <label htmlFor="username">User Name</label>
//           <input
//             id="username"
//             className="text-box"
//             type="text"
//             placeholder="Enter Name"
//             name="username"
//             required
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             required
//           />
//           {isSignIn ? null : (
//             <div>
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm Password"
//                 name="confirmPassword"
//                 required
//               />
//             </div>
//           )}
//           <label>
//             <input type="checkbox" checked="checked" name="remember" /> Remember me
//           </label>
//           <div className="submit">
//             <button type="submit" className="signinBtn">
//               {isSignIn ? 'Log in' : 'Sign up'}
//             </button>
//           </div>
//         </div>
//         <p className="inline-p">
//           {isSignIn ? "Not a member? " : "Already have an account? "}
//           <span className='signup' onClick={toggleForm}>
//             {isSignIn ? 'Sign up' : 'Log in'}
//           </span>
//         </p>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import styles from './LoginPage.css';
// import { Link } from 'react-router-dom';

// const LoginPage = () => {
//   const [isSignIn, setIsSignIn] = useState(true);

//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//   };

//   return (
//     <div className={styles.containerWrapper}>
//     <div className="container-wrapper">
//       <div className="top">
//         <div className="logo"></div>
//       </div>
//       <form id="signin-form" className="signin-form" action="">
//         <div className="container sign">
//           <h1>{isSignIn ? 'Log in' : 'Sign up'}</h1>
//           <p>
//             Please fill in this form to {isSignIn ? 'log in' : 'create an account'}.
//           </p>
//           <br />
//           <label htmlFor="username">User Name</label>
//           <input
//             id="username"
//             className="text-box"
//             type="text"
//             placeholder="Enter Name"
//             name="username"
//             required
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             required
//           />
//           {isSignIn ? null : (
//             <div>
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm Password"
//                 name="confirmPassword"
//                 required
//               />
//             </div>
//           )}
//           <label>
//             <input type="checkbox" checked="checked" name="remember" /> Remember me
//           </label>
//           <div className="submit">
//             <button type="submit" className="signinBtn">
//               {isSignIn ? 'Log in' : 'Sign up'}
//             </button>
//           </div>
//         </div>
//         <p className="inline-p">
//           {isSignIn ? "Not a member? " : "Already have an account? "}
//           <span className='signup' onClick={toggleForm}>
//             {isSignIn ? 'Sign up' : 'Log in'}
//           </span>
//         </p>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { LoginForm, RegisterForm } from '../../components'; 
import styles from './LoginPage.css'; 

export default function LoginPage() {
  const [currentForm, setCurrentForm] = useState('LoginForm');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className="forms">
        {currentForm === 'LoginForm' ? (
          <LoginForm onFormSwitch={toggleForm} />
        ) : (
          <RegisterForm onFormSwitch={toggleForm} />
        )}
      </div>
    </div>
  );
}

