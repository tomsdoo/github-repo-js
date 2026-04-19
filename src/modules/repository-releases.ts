import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryReleases(token: string) {
  return class GitHubRepositoryReleases extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    Endpoints["POST /repos/{owner}/{repo}/releases"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/releases`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
