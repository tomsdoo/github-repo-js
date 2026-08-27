import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryCompare(token: string) {
  return class GitHubRepositoryCompare extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/compare/{base}...{head}"]["response"]["data"],
    unknown
  > {
    public baseBranch: string;
    public headBranch: string;
    constructor(owner: string, repo: string, base: string, head: string) {
      super(token, owner, repo);
      this.baseBranch = base;
      this.headBranch = head;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/compare/${this.baseBranch}...${this.headBranch}`;
    }
  };
}
