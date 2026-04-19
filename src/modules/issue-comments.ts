import { GitHubIssueApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubIssueComments(token: string) {
  return class GitHubIssueComments extends GitHubIssueApiBase<
    Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"]["response"]["data"] extends (infer T)[] ? T : never,
    Endpoints["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"]["request"]["data"]
  > {
    constructor(owner: string, repo: string, issueNumber: number) {
      super(token, owner, repo, issueNumber);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/issues/${this.issueNumber}/comments`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
