import { GitHubRepoApiBase } from "@/modules/base";
import { readyGitHubBlob } from "@/modules/blob";
import { readyGitHubBlobs } from "@/modules/blobs";
import { readyGitHubIssue } from "@/modules/issue";
import { readyGitHubRepositoryBranch } from "@/modules/repository-branch";
import { readyGitHubRepositoryBranches } from "@/modules/repository-branches";
import { readyGitHubRepositoryCommits } from "@/modules/repository-commits";
import { readyGitHubRepositoryIssues } from "@/modules/repository-issues";
import { readyGitHubReference } from "@/modules/reference";
import { readyGitHubReferenceForGet } from "@/modules/reference-get";
import { readyGitHubRepositoryPull } from "@/modules/repository-pull";
import { readyGitHubRepositoryPulls } from "@/modules/repository-pulls";
import { readyGitHubRepositoryReferences } from "@/modules/repository-references";
import { readyGitHubRepositoryReleases } from "@/modules/repository-releases";
import { readyGitHubTree } from "@/modules/tree";
import { readyGitHubRepositoryTrees } from "@/modules/repository-trees";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepository(token: string) {
  const GitHubBlob = readyGitHubBlob(token);
  const GitHubBlobs = readyGitHubBlobs(token);
  const GitHubIssue = readyGitHubIssue(token);
  const GitHubReference = readyGitHubReference(token);
  const GitHubReferenceForGet = readyGitHubReferenceForGet(token);
  const GitHubRepositoryIssues = readyGitHubRepositoryIssues(token);
  const GitHubRepositoryBranch = readyGitHubRepositoryBranch(token);
  const GitHubRepositoryBranches = readyGitHubRepositoryBranches(token);
  const GitHubRepositoryCommits = readyGitHubRepositoryCommits(token);
  const GitHubRepositoryPull = readyGitHubRepositoryPull(token);
  const GitHubRepositoryPulls = readyGitHubRepositoryPulls(token);
  const GitHubRepositoryReferences = readyGitHubRepositoryReferences(token);
  const GitHubRepositoryReleases = readyGitHubRepositoryReleases(token);
  const GitHubRepositoryTrees = readyGitHubRepositoryTrees(token);
  const GitHubTree = readyGitHubTree(token);
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
    async postReference(...params: Parameters<typeof GitHubRepositoryReferences["prototype"]["post"]>) {
      return await new GitHubRepositoryReferences(this.owner, this.repo).post(...params);
    }
    async getReference(ref: string) {
      return await new GitHubReferenceForGet(this.owner, this.repo, ref).get();
    }
    async getBranchReference(branchName: string) {
      return await new GitHubReferenceForGet(this.owner, this.repo, `heads/${branchName}`).get();
    }
    async getTagReference(tagName: string) {
      return await new GitHubReferenceForGet(this.owner, this.repo, `tags/${tagName}`).get();
    }
    async patchReference(ref: string, ...params: Parameters<typeof GitHubReference["prototype"]["patch"]>) {
      return await new GitHubReference(this.owner, this.repo, ref).patch(...params);
    }
    async deleteReference(ref: string) {
      return await new GitHubReference(this.owner, this.repo, ref).delete();
    }
    async getBlob(fileSha: string) {
      return await new GitHubBlob(this.owner, this.repo, fileSha).get();
    }
    async postBlob(...params: Parameters<typeof GitHubBlobs["prototype"]["post"]>) {
      return await new GitHubBlobs(this.owner, this.repo).post(...params);
    }
    async getTree(sha: string) {
      return await new GitHubTree(this.owner, this.repo, sha).get();
    }
    async postTree(...params: Parameters<typeof GitHubRepositoryTrees["prototype"]["post"]>) {
      return await new GitHubRepositoryTrees(this.owner, this.repo).post(...params);
    }
    async getIssues() {
      return await new GitHubRepositoryIssues(this.owner, this.repo).getList();
    }
    async postIssue(...params: Parameters<typeof GitHubRepositoryIssues["prototype"]["post"]>) {
      return await new GitHubRepositoryIssues(this.owner, this.repo).post(...params);
    }
    issue(issueNumber: number) {
      return new GitHubIssue(this.owner, this.repo, issueNumber);
    }
    async getIssue(issueNumber: number) {
      return await new GitHubIssue(this.owner, this.repo, issueNumber).get();
    }
    async patchIssue(issueNumber: number, ...params: Parameters<typeof GitHubIssue["prototype"]["patch"]>) {
      return await new GitHubIssue(this.owner, this.repo, issueNumber).patch(...params);
    }
    async getPulls() {
      return await new GitHubRepositoryPulls(this.owner, this.repo).getList();
    }
    async postPull(...params: Parameters<typeof GitHubRepositoryPulls["prototype"]["post"]>) {
      return await new GitHubRepositoryPulls(this.owner, this.repo).post(...params);
    }
    pull(pullNumber: number) {
      return new GitHubRepositoryPull(this.owner, this.repo, pullNumber);
    }
    async getPull(pullNumber: number) {
      return await new GitHubRepositoryPull(this.owner, this.repo, pullNumber).get();
    }
    async patchPull(pullNumber: number, ...params: Parameters<typeof GitHubRepositoryPull["prototype"]["post"]>) {
      return await new GitHubRepositoryPull(this.owner, this.repo, pullNumber).patch(...params);
    }
    async getReleases() {
      return await new GitHubRepositoryReleases(this.owner, this.repo).getList();
    }
    async postRelease(...params: Parameters<typeof GitHubRepositoryReleases["prototype"]["post"]>) {
      return await new GitHubRepositoryReleases(this.owner, this.repo).post(...params);
    }
    async postCommit(...params: Parameters<typeof GitHubRepositoryCommits["prototype"]["post"]>) {
      return await new GitHubRepositoryCommits(this.owner, this.repo).post(...params);
    }
  };
}
