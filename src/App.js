import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import { useAuthContext } from 'contexts/AuthContext';
import Routes from "pages/Routes"
import "./config/globle"
import "react-quill/dist/quill.snow.css";

function App() {

  const { isAppLoading } = useAuthContext()

  // console.log('process.env', process.env)

  if (isAppLoading)
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
