import * as React from "react";
import ReactDOM from "react-dom";
import defaultConfig from "./config.json";
import { Repo, GithubAuthButtton, InputRange } from "./components";
import { GlobalStyles } from "./theme/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { AuthContext } from "./context/auth";
import { PollingContext } from "./context/poll";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [repos, setRepos] = React.useState(defaultConfig.repos);
  const [authToken, setAuthToken] = React.useState("");
  const [pollTiming, setPollTiming] = React.useState("10000");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <GithubAuthButtton />
        <Container>
          <HeaderText>Github Dashboard</HeaderText>
          <HeaderText>Click to vote</HeaderText>
          <PollingContext.Provider value={{ pollTiming, setPollTiming }}>
            <InputRange />
            <RepoContainer>
              {repos.map((repo, index) => {
                return (
                  <Repo repoName={repo.repo} repoOwner={repo.owner} key={index}>
                    {repo.owner}
                  </Repo>
                );
              })}
            </RepoContainer>
          </PollingContext.Provider>
        </Container>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

const HeaderText = styled.h1`
  text-align: center;
  font-size: 2rem;
`;
const Container = styled.div`
  padding: 10px;
  margin: 120px auto;
  max-width: 1200px;
  align-items: baseline;
`;

const RepoContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

ReactDOM.render(<App />, document.getElementById("app"));
