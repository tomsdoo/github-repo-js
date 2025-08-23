import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryBranch(token: string) {
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/branches/{branch}"]["response"]["data"],
    unknown
  > {
    protected branch: string;
    constructor(owner: string, repo: string, branch: string) {
      super(token, owner, repo);
      this.branch = branch;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/branches/${this.branch}`;
    }
  };
}

