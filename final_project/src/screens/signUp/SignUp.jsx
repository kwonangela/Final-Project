// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import "./signup.css";

// export default function SignUp() {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     valid: "",
//   });

//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");
//   const [valid, setValid] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUser({
//       username,
//       email,
//       password,
//       passwordConfirm,
//       valid:
//         password === passwordConfirm ? (password !== "" ? true : "") : false,
//     });

//     setEmail("");
//     setPassword("");
//     setPasswordConfirm("");
//     setValid(null);
//   };

//   const passwordValidation = (password) => {
//     const specialChar = /[\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/g;
//     const numChar = /\d/;
//     if (
//       password.length >= 6 &&
//       specialChar.test(password) &&
//       numChar.test(password)
//     )
//       return true;
//     else return false;
//   };

//   const result = (validation) => {
//     if (validation === "") {
//       return <p></p>;
//     } else if (validation === true) {
//       if (passwordValidation(user.password) === false) {
//         return (
//           <>
//             <p>"Password Must Contain at least 6 letters"</p>
//             <p>"Password Must Include a Number and Special Character"</p>
//           </>
//         );
//       } else {
//         return <Navigate to="/" replace={true} />;
//       }
//     } else {
//       return (
//         <div className="password-mismatch">
//           Passwords do not match. Please try again.
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="sign-up-container">
//       <form className="form" onSubmit={handleSubmit}>
//         <h1 className="sign-up-heading">SIGN UP</h1>
//         <div className="inputs">
//           <input
//             className="signup-input"
//             id="username"
//             type="text"
//             placeholder="USERNAME"
//             value={username}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             className="signup-input"
//             id="email"
//             type="email"
//             placeholder="EMAIL"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className="signup-input"
//             type="password"
//             placeholder="PASSWORD"
//             value={password}
//             minLength="6"
//             pattern="(?=.*\d)(?=.*[a-z])(?=.*?[~`!@#$%\^&*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{6,}"
//             onChange={(e) => setPassword(e.target.value)}
//             title="Must be at least 6 characters and include at least 1 number, 1 letter, and 1 special character."
//           />
//           <input
//             className="signup-input"
//             type="password"
//             placeholder="CONFIRM PASSWORD"
//             value={passwordConfirm}
//             onChange={(e) => {
//               return setPasswordConfirm(e.target.value);
//             }}
//           />
//         </div>
//         <button id="submit-password" type="submit" value="submit">
//           Sign Up
//         </button>
//         <>{result(user.valid)}</>
//       </form>
//     </div>
//   );
// }
