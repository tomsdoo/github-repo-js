import { GitHubIssueApiBase } from "@/modules/base";
import { readyGitHubIssueComments } from "@/modules/issue-comments";
import type { Endpoints } from "@octokit/types";

export function readyGitHubIssue(token: string) {
  const GitHubIssueComments = readyGitHubIssueComments(token);
  return class GitHubIssue extends GitHubIssueApiBase<
    Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"],
    Endpoints["PATCH /repos/{owner}/{repo}/issues/{issue_number}"]["request"]["data"]
  > {
    constructor(owner: string, repo: string, issueNumber: number) {
      super(token, owner, repo, issueNumber);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/issues/${this.issueNumber}`;
    }
    async getComments() {
      return await new GitHubIssueComments(this.owner, this.repo, this.issueNumber).getList();
    }
    async postComment(...params: Parameters<typeof GitHubIssueComments["prototype"]["post"]>) {
      return await new GitHubIssueComments(this.owner, this.repo, this.issueNumber).post(...params);
    }
  };
}
