/**
 *
 * @param {string} owner Owner of repo
 * @param {string} repo Name of repo
 * @param {string} token OAUTH token
 * @returns {Promise<{watchers: number, forks: number, issues: number, stars: number, avatar: string}>}
 */
export const getRepoStats = (owner, repo, token) => {
  let url = `https://api.github.com/repos/${owner}/${repo}`;

  let headers = {
    Accept: "application/vnd.github.v3+json",
  };

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    headers: headers,
  })
    .then((data) => data.json())
    .then((result) => {
      return {
        stars: result.watchers,
        watchers: result.subscribers_count,
        forks: result.forks_count,
        issues: result.open_issues_count,
        avatar: result.organization.avatar_url,
      };
    })
    .catch((err) => {
      console.log(`ERROR: calling: ${url}`);
      console.log("See below for more info:");
      console.log(err);
    });
};
