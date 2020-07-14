import * as React from "react";
import styled from "styled-components";
import {
  getRepoStats,
  getTotalCommits,
  getTotalPulls,
} from "../../../lib/services/github";
import defaultConfig from "../../config.json";
import { AuthContext } from "../../context/auth";
import { useInterval } from "../../hooks/useInterval";
import { PollingContext } from "../../context/poll";
import { vote } from "../../services/vote-service";

interface RepoProps {
  repoName: string;
  repoOwner: string;
}

export const Repo: React.FC<RepoProps> = ({
  children,
  repoName,
  repoOwner,
}) => {
  const [avatar, setAvatar] = React.useState<string>("");
  const [forks, setForks] = React.useState<string>("");
  const [issues, setIssues] = React.useState<string>("");
  const [stars, setStars] = React.useState<string>("");
  const [watchers, setWatchers] = React.useState<string>("");
  const [totalCommits, setTotalCommits] = React.useState<string>("");
  const [pulls, setPulls] = React.useState<string>("");
  const { authToken } = React.useContext(AuthContext);
  const { pollTiming } = React.useContext(PollingContext);

  const fetchGithubData = () => {
    if (
      defaultConfig.filters.selected.includes("Forks") ||
      defaultConfig.filters.selected.includes("Issues") ||
      defaultConfig.filters.selected.includes("Watchers") ||
      defaultConfig.filters.selected.includes("Stars")
    ) {
      getRepoStats(repoOwner, repoName, authToken).then((data) => {
        setAvatar(data.avatar);
        if (defaultConfig.filters.selected.includes("Forks")) {
          setForks(new Intl.NumberFormat().format(data.forks));
        }
        if (defaultConfig.filters.selected.includes("Watchers")) {
          setWatchers(new Intl.NumberFormat().format(data.watchers));
        }
        if (defaultConfig.filters.selected.includes("Issues")) {
          setIssues(new Intl.NumberFormat().format(data.issues));
        }
        if (defaultConfig.filters.selected.includes("Stars")) {
          setStars(new Intl.NumberFormat().format(data.stars));
        }
      });
    }
    if (defaultConfig.filters.selected.includes("Commits")) {
      getTotalCommits(repoOwner, repoName, authToken).then((totalCommits) => {
        setTotalCommits(new Intl.NumberFormat().format(totalCommits));
      });
    }
    if (defaultConfig.filters.selected.includes("Pulls")) {
      getTotalPulls(repoOwner, repoName, authToken).then((totalPulls) => {
        setPulls(new Intl.NumberFormat().format(totalPulls));
      });
    }
  };

  useInterval(() => {
    fetchGithubData();
  }, pollTiming);

  React.useEffect(() => {
    fetchGithubData();
  }, []);

  return (
    <Container
      onClick={() => {
        if (confirm(`Are you sure you want to vote for: ${repoName}`)) {
          vote(repoName, repoOwner).then((result) => {
            if (result.message === "ok") {
              alert("You have successfully voted!");
            } else if (result.messsage === "You already voted") {
              alert(
                "You have already voted. Please use a different email or a different client"
              );
            }
          });
        }
      }}
    >
      <RepoImage src={avatar} />
      <RepoStats>
        <h1>{repoName.toUpperCase()}</h1>
        {forks && (
          <div>
            Forks: <span>{forks}</span>
          </div>
        )}

        {issues && (
          <div>
            Issues: <span>{issues}</span>
          </div>
        )}

        {stars && (
          <div>
            Stars: <span>{stars}</span>{" "}
          </div>
        )}

        {watchers && (
          <div>
            Watchers: <span>{watchers}</span>
          </div>
        )}

        {totalCommits && (
          <div>
            Total Commits: <span>{totalCommits}</span>
          </div>
        )}
        {pulls && (
          <div>
            Total Pulls: <span>{pulls}</span>
          </div>
        )}
      </RepoStats>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  margin-top: 20px;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
`;

const RepoImage = styled.img`
  max-height: 100px;
`;

const RepoStats = styled.div`
  text-align: end;
  & > h1 {
    font-size: 2rem;
  }
  color: #515d6e;
  & > div {
    white-space: nowrap;
    & > span {
      font-weight: bold;
      font-size: 1rem;
    }
  }
`;
