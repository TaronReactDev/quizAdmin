import React, {useState} from 'react';
import axios from "axios";
import "./loginStyles.scss"

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [radio, setRadio] = useState("")

    const handleChangForLogin = (type, e) => () => {
        switch (type) {
            case "email":
                setEmail(e.target.value);
                break;
            case "pass":
                setPassword(e.target.value);
                break;
            case "radio":
                setRadio(e.target.value);
                break;
        }
    }

    console.log(radio)

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginInfo = {
            email,
            password
        }

        axios.get(`api/login/admin`)

    }
    return (
        <>
            <div className="loginContainer">
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={handleChangForLogin("email")}/>
                    <label htmlFor="pass">Password</label>
                    <input type="password" id="pass" value={password} onChange={handleChangForLogin("pass")}/>
                    <div onChange={handleChangForLogin("radio")}>

                        <input name="login" type="radio" value="Login as admin" />
                        <label htmlFor="Login as admin"> Login as admin </label>

                        <input name="login" type="radio" value="Login as user"/>
                        <label htmlFor="Login as admin"> Login as user </label>
                    </div>
                </form>
            < /div>
            <button type="submit">Login</button>
        </>
    );
}
export default LoginPage;