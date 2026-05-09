/**
 * @param {import("./types").WorkContext} context
 * @param {string} keyword
 */
export default async function work({ github }, keyword) {
  const repos = await github.getMyRepositories();
  const filteredRepos = repos.filter(({ name }) => name.includes(keyword));
  console.log(filteredRepos.map(({ full_name }) => full_name));
}
