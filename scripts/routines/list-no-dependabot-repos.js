/**
 * @param {import("./types").WorkContext} context
 */
export default async function work({ github }) {
  const repos = await github.getMyRepositories();
  const notHaveDependabotConfigRepos = [];
  for (const repo of repos) {
    const repoInstance = github.repo(repo.owner.login, repo.name);
    try {
      const { tree } = await repoInstance.getTree(repo.default_branch);
      const dependabotConfig = tree.find(({ path }) =>
        /\.github\/dependabot\.ya?ml$/i.test(path),
      );
      if (dependabotConfig == null) {
        notHaveDependabotConfigRepos.push(repo);
      }
    } catch (e) {
      console.error(`Failed to get tree for ${repo.full_name}: ${e.message}`);
    }
  }
  console.log(notHaveDependabotConfigRepos.map(({ full_name }) => full_name));
}
