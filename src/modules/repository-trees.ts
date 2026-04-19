import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryTrees(token: string) {
  return class GitHubRepositoryTrees extends GitHubRepoApiBase<
    Endpoints["POST /repos/{owner}/{repo}/git/trees"]["response"]["data"],
    Endpoints["POST /repos/{owner}/{repo}/git/trees"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/trees`;
    }
  };
}
