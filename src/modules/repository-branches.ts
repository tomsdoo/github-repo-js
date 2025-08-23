import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryBranches(token: string) {
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/branches"]["response"]["data"] extends (infer T)[] ?  T : never,
    unknown
  > {
    constructor(owner: string, repo: string) {
      super(token, owner,repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/branches`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
