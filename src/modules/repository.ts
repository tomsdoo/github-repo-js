import { GitHubRepoApiBase } from "@/modules/base";
import { readyGitHubIssue } from "@/modules/issue";
import { readyGitHubRepositoryIssues } from "@/modules/repository-issues";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepository(token: string) {
  const GitHubIssue = readyGitHubIssue(token);
  const GitHubRepositoryIssues = readyGitHubRepositoryIssues(token);
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"],
    Endpoints["PATCH /repos/{owner}/{repo}"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}`;
    }
    async getIssues() {
      return await new GitHubRepositoryIssues(this.owner, this.repo).getList();
    }
    async postIssue(...params: Parameters<typeof GitHubRepositoryIssues["prototype"]["post"]>) {
      return await new GitHubRepositoryIssues(this.owner, this.repo).post(...params);
    }
    async getIssue(issueNumber: number) {
      return await new GitHubIssue(this.owner, this.repo, issueNumber).get();
    }
    async patchIssue(issueNumber: number, ...params: Parameters<typeof GitHubIssue["prototype"]["patch"]>) {
      return await new GitHubIssue(this.owner, this.repo, issueNumber).patch(...params);
    }
  };
}
