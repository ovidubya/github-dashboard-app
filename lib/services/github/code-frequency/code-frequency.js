/**
 *
 * @param {string} owner Owner of the repo, example: Facebook
 * @param {string} repo Name of the repo, example: react
 * @param {number} weeks Number of weeks, example: 3
 * @returns {Promise<number>}>}
 */
export const getCodeFrequency = (owner, repo, weeks) => {
  let url = `https://api.github.com/repos/${owner}/${repo}/stats/participation`;

  return fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((data) => data.json())
    .then((result) => {
      return result.all.slice(0, weeks).reduce((acc, current) => {
        return acc + current;
      });
    })
    .catch((err) => {
      console.log(`ERROR: calling: ${url}`);
      console.log("See below for more info:");
      console.log(err);
    });
};
