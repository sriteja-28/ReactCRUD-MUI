import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"

const App = () => {
  return (
    <>
    <h1>Crud Application</h1>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;