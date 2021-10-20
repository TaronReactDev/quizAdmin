import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import "./loginStyles.scss"
import {Link, Redirect} from "react-router-dom";

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")

    const radioRefAdmin = useRef(null)
    const radioRefUser = useRef(null)

    const [direction, setDirection] = useState("/")


    const handleChangForLogin = (type) => (e) => {
        switch (type) {
            case "email":
                setEmail(e.target.value);
                break;
            case "pass":
                setPassword(e.target.value);
                break;
            case "radioAdmin":
                setType(radioRefAdmin.current.value);
                break;
            case "radioUser":
                setType(radioRefUser.current.value);
                break;
        }
    }


    const handleLoginSubmit = async (e) => {

        e.preventDefault();
        const loginInfo = {
            email,
            password,
            type

        }
        try {
            const res = await axios.post(`api/login/admin`, loginInfo)


            // switch (res.data.message) {
            //     case "isAdmin":
            //         setPassword("");
            //         setEmail("");
            //         setType("");
            //         setDirection("admin")
            //         break;
            //
            //     case "isUser" :
            //         setPassword("");
            //         setEmail("");
            //         setType("");
            //         setDirection("user")
            //         break;
            // }

            console.log( res, "res.data")
        } catch
            (e) {
            console.log("request failed", e)
        }


    }


    if (direction === "/") {
        return (
            <div className="pseudoBody">
                <div className="loginContainer">
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={handleChangForLogin("email")}/>
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" value={password} onChange={handleChangForLogin("pass")}/>
                        <div onChange={handleChangForLogin("radio")}>

                            <input name="login" type="radio" ref={radioRefAdmin} onChange={handleChangForLogin("radioAdmin")}
                                   value="admin"/>
                            <label htmlFor="Login as admin"> Login as admin </label>

                            <input name="login" type="radio" ref={radioRefUser} onChange={handleChangForLogin("radioUser")}
                                   value="user"/>
                            <label htmlFor="Login as admin"> Login as user </label>
                        </div>
                    </form>

                    <button type="submit" onClick={handleLoginSubmit}>Login</button>

                < /div>
            </div>
        );
    } else if (direction === "admin") {
        return <Redirect to="/admin"/>
    }
}
export default LoginPage;