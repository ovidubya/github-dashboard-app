import * as React from "react";
import ReactDOM from "react-dom";
import defaultConfig from "./config.json";
import { Repo } from "./components";
import { GlobalStyles } from "./theme/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [repos, setRepos] = React.useState(defaultConfig.repos);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HeaderText>Github Dashboard</HeaderText>
      <HeaderText>Click to vote</HeaderText>
      <Container>
        <RepoContainer>
          {repos.map((repo, index) => {
            return (
              <Repo repoName={repo.repo} repoOwner={repo.owner} key={index}>
                {repo.owner}
              </Repo>
            );
          })}
        </RepoContainer>
      </Container>
    </ThemeProvider>
  );
};

const HeaderText = styled.h1`
  text-align: center;
  font-size: 2rem;
`;
const Container = styled.div`
  padding: 10px;
  margin: 0 auto;
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
