import { GitHubPullApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubPullCommits(token: string) {
  return class GitHubPullCommits extends GitHubPullApiBase<
    Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    unknown
  > {
    constructor(owner: string, repo: string, pullNumber: number) {
      super(token, owner, repo, pullNumber);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/pulls/${this.pullNumber}/commits`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
