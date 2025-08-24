import { GitHubRepoApiBase } from "@/modules/base";
import { readyGitHubIssue } from "@/modules/issue";
import { readyGitHubRepositoryBranch } from "@/modules/repository-branch";
import { readyGitHubRepositoryBranches } from "@/modules/repository-branches";
import { readyGitHubRepositoryIssues } from "@/modules/repository-issues";
import { readyGitHubReference } from "@/modules/reference";
import { readyGitHubRepositoryReferences } from "@/modules/repository-references";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepository(token: string) {
  const GitHubIssue = readyGitHubIssue(token);
  const GitHubReference = readyGitHubReference(token);
  const GitHubRepositoryIssues = readyGitHubRepositoryIssues(token);
  const GitHubRepositoryBranch = readyGitHubRepositoryBranch(token);
  const GitHubRepositoryBranches = readyGitHubRepositoryBranches(token);
  const GitHubRepositoryReferences = readyGitHubRepositoryReferences(token);
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
    async getBranches() {
      return await new GitHubRepositoryBranches(this.owner, this.repo).getList();
    }
    async getBranch(branchName: string) {
      return await new GitHubRepositoryBranch(this.owner, this.repo, branchName).get();
    }
    async getReferences(refName: string) {
      return await new GitHubRepositoryReferences(this.owner, this.repo).getMatchingList(refName);
    }
    async getBranchReferences() {
      return await new GitHubRepositoryReferences(this.owner, this.repo).getMatchingList("heads/");
    }
    async getTagReferences() {
      return await new GitHubRepositoryReferences(this.owner, this.repo).getMatchingList("tags/");
    }
    async getReference(ref: string) {
      return await new GitHubReference(this.owner, this.repo, ref).get();
    }
    async getBranchReference(branchName: string) {
      return await new GitHubReference(this.owner, this.repo, `heads/${branchName}`).get();
    }
    async getTagReference(tagName: string) {
      return await new GitHubReference(this.owner, this.repo, `tags/${tagName}`).get();
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
