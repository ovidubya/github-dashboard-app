/**
 *
 * @param repoName Name of the repo
 * @param repoAuthor Name of the repo's owner
 */
export const vote = (repoName, repoOwner) => {
  const payload = {
    user: prompt("Enter your email: "),
    vote: {
      repo: `https://github.com/${repoOwner}/${repoName}`,
      name: repoName,
    },
  };
  return fetch("https://boiling-reef-23922.herokuapp.com/vote", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((data) => data.json())
    .then((result) => result);
};
