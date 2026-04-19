import { GitHubPullApiBase } from "@/modules/base";
import { readyGitHubPullCommits } from "@/modules/pull-commits";
import { readyGitHubPullReviewers } from "@/modules/pull-reviewers";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryPull(token: string) {
  const GitHubPullCommits = readyGitHubPullCommits(token);
  const GitHubPullReviewers = readyGitHubPullReviewers(token);
  return class GitHubRepositoryPull extends GitHubPullApiBase<
    Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}"]["response"]["data"],
    Endpoints["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"]["request"]["data"]
  > {
    constructor(owner: string, repo: string, pullNumber: number) {
      super(token, owner, repo, pullNumber);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/pulls/${this.pullNumber}`;
    }
    async getCommits() {
      return await new GitHubPullCommits(
        this.owner,
        this.repo,
        this.pullNumber,
      ).getList();
    }
    async getReviewers() {
      return await new GitHubPullReviewers(
        this.owner,
        this.repo,
        this.pullNumber,
      ).get();
    }
    async postReviewers(
      ...params: Parameters<(typeof GitHubPullReviewers)["prototype"]["post"]>
    ) {
      return await new GitHubPullReviewers(
        this.owner,
        this.repo,
        this.pullNumber,
      ).post(...params);
    }
  };
}
