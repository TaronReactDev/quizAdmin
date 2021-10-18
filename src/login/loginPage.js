// import React, {useState} from 'react';
// import axios from "axios";
//
// const LoginPage = (props) => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//
//     const handleChangForLogin = (type, e) => {
//         switch (type) {
//             case "email":
//                 setEmail(e.target.value);
//                 break;
//             case "pass":
//                 setPassword(e.target.value);
//                 break;
//         }
//     }
//
//     const handleLoginSubmit = (e) => {
//         e.preventDefault();
//         const loginInfo = {
//             email,
//             password
//         }
//
//         axios.get(`api/login/admin`)
//
//     }
//     return (
//         <>
//             <div>
//                 <form onSubmit={handleLoginSubmit}>
//                     <label htmlFor="email">Email</label>
//                     <input type="text" id="email" value={email} onChange={handleChangForLogin("email")}/>
//                     <label htmlFor="pass">Password</label>
//                     <input type="password" id="pass" value={password} onChange={handleChangForLogin("pass")}/>
//                 </form>
//             < /div>
//             <button type="submit">Login</button>
//         </>
//     );
// }
// export default LoginPage;