import { GitHubPullApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubPullReviewers(token: string) {
  return class extends GitHubPullApiBase<
    Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"]["response"]["data"],
    Endpoints["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"]["request"]["data"]
  > {
    constructor(owner: string, repo: string, pullNumber: number) {
      super(token, owner, repo, pullNumber);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/pulls/${this.pullNumber}/requested_reviewers`;
    }
  };
}
