import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [apiResponse, setApiResponse] = useState(null);
  const router = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: "read:users",
            },
          });

          const response = await fetch("http://localhost:3000/protected", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          setApiResponse(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return (
      <>
        <div>Protected endpoint can not be displayed if you are not logged in</div>
      </>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <h3>API Response:</h3>
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        <button onClick={() => router("/profile")}>Profile</button>
        <LogoutButton />
      </div>
    )
  );
};

export default Users;
