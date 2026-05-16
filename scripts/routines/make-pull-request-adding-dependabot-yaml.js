const dependabotYamlCOntent = `
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dev-dependencies:
        applies-to: version-updates
        dependency-type: development
        update-types:
          - minor
          - patch
`.replace(/^\n/, "");

function hasStatus(error, status) {
  return error?.cause?.response?.status === status;
}

/**
 * @param {import("./types").WorkContext} context
 */
async function listNoDependabotRepos({ github }) {
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
  return notHaveDependabotConfigRepos;
}

/**
 * @param {import("./types").WorkContext} context
 * @param {string} repositoryFullName
 */
async function createPullRequestForRepo({ github }, repositoryFullName) {
  const [owner, name] = repositoryFullName.split("/");
  const repo = github.repo(owner, name);
  const { default_branch } = await repo.get();
  const branchName = `add-dependabot-config-${Date.now()}`;
  const commitMessage = "Add dependabot configuration";
  const prTitle = "Add dependabot configuration";
  const prBody = `
This pull request adds a basic dependabot configuration to keep dependencies up to date and secure.

The configuration checks for updates to npm dependencies on a weekly basis. You can customize the configuration further by editing the \`.github/dependabot.yml\` file after merging this PR.

For more information on dependabot and how to customize it, please refer to the [dependabot documentation](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file).
    `.trim();
  const currentTree = await repo.getTree(default_branch);
  const alreadyExists = currentTree.tree.some(({ path }) =>
    /^\.github\/dependabot\.ya?ml$/.test(path),
  );
  if (alreadyExists) {
    console.log(
      `Dependabot configuration already exists in ${repositoryFullName}, skipping PR creation.`,
    );
    return;
  }
  const baseRef = await repo.getBranchReference(default_branch);
  const baseCommitSha = baseRef.object.sha;
  const newTree = await repo.postTree({
    base_tree: currentTree.sha,
    tree: [
      {
        path: ".github/dependabot.yml",
        mode: "100644",
        type: "blob",
        content: dependabotYamlCOntent,
      },
    ],
  });
  const newCommit = await repo.postCommit({
    message: commitMessage,
    tree: newTree.sha,
    parents: [baseCommitSha],
  });
  try {
    await repo.postReference({
      ref: `refs/heads/${branchName}`,
      sha: newCommit.sha,
    });
  } catch (error) {
    if (!hasStatus(error, 422)) {
      throw error;
    }
    await repo.patchReference(`refs/heads/${branchName}`, {
      sha: newCommit.sha,
    });
  }

  try {
    const pr = await repo.postPull({
      title: prTitle,
      body: prBody,
      head: branchName,
      base: default_branch,
    });
    console.log(`created ${pr.html_url}`);
  } catch (error) {
    if (hasStatus(error, 422)) {
      console.log(
        `Pull request already exists for ${repositoryFullName}, skipping PR creation.`,
      );
      return;
    }
    throw error;
  }
}

/**
 * @param {import("./types").WorkContext} context
 * @param {string} repositoryFullName
 */
export default async function work({ github }, repositoryFullName) {
  if (repositoryFullName == null || repositoryFullName.trim() === "") {
    const repos = await listNoDependabotRepos({ github });
    for (const { full_name } of repos) {
      console.log(full_name);
    }
    return;
  }

  await createPullRequestForRepo({ github }, repositoryFullName);
}
