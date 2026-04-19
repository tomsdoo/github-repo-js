import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryCommits(token: string) {
  return class GitHubRepositoryCommits extends GitHubRepoApiBase<
    Endpoints["POST /repos/{owner}/{repo}/git/commits"]["response"]["data"],
    Endpoints["POST /repos/{owner}/{repo}/git/commits"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/commits`;
    }
  };
}
