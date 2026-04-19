import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryIssues(token: string) {
  return class GitHubRepositoryIssues extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"] extends (infer T)[] ? T : never,
    Endpoints["POST /repos/{owner}/{repo}/issues"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/issues`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
