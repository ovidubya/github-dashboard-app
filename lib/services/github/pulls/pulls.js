/**
 * @param {string} owner Owner of repo
 * @param {string} repo Name of repo
 * @param {string} token OAUTH Token
 * @returns {Promise<number>} Number of total pull requests the repo contains on main master branch
 */
export const getTotalPulls = (owner, repo, token) => {
  let url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
  let pages = 0;

  let headers = {
    Accept: "application/vnd.github.v3+json",
  };

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    headers: headers,
  })
    .then((data) => data.headers)
    .then(
      (result) =>
        result
          .get("link")
          .split(",")[1]
          .match(/.*page=(?<page_num>\d+)/).groups.page_num
    )
    .then((numberOfPages) => {
      pages = numberOfPages;
      return fetch(url + `?page=${numberOfPages}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }).then((data) => data.json());
    })
    .then((data) => {
      return data.length + (pages - 1) * 30;
    })
    .catch((err) => {
      console.log(`ERROR: calling: ${url}`);
      console.log("See below for more info:");
      console.log(err);
    });
};
