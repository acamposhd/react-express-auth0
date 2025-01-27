import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);
  const { isAuthenticated, isLoading } = useAuth0();

  const router = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {isAuthenticated ? (
        <>
          <button onClick={() => router("/protected")}>Protected</button>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default Home;
