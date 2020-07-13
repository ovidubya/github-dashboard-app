import * as React from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/auth";

interface GithubAuthButttonProps {}
declare var netlify: any;

export const GithubAuthButtton: React.FC<GithubAuthButttonProps> = () => {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const { authToken, setAuthToken } = React.useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!success) {
      var authenticator = new netlify.default({});
      authenticator.authenticate(
        { provider: "github", scope: "user" },
        (err, data) => {
          if (err) {
            setError(err);
          } else {
            setSuccess(true);
            setAuthToken(data.token);
          }
        }
      );
    }
  };

  return (
    <Login onClick={handleLogin} href="#">
      {success ? "Logged in" : "Log into Github"}
    </Login>
  );
};

const Login = styled.a`
  position: fixed;
  right: 20px;
  top: 20px;
  text-decoration: none;
`;
