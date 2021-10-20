import Admin from "./admin/index"
import Login from "./login/loginPage"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                    <Route path="/admin" component={Admin}/>
            </Switch>

        </Router>

);
}

export default App;
