import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryPulls(token: string) {
  return class GitHubRepositoryPulls extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"] extends (infer T)[] ? T : never,
    Endpoints["POST /repos/{owner}/{repo}/pulls"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/pulls`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
