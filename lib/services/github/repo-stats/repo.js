/**
 *
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{watchers: number, forks: number, issues: number, stars: number, avatar: string}>}
 */
export const getRepoStats = (owner, repo) => {
  let url = `https://api.github.com/repos/${owner}/${repo}`;

  return fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
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
