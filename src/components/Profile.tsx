import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const router = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return (
      <>
        <div>Not logged in</div>
        <LoginButton />
      </>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => router("/protected")}>Protected Route</button>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;
