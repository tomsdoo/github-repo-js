import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryReferences(token: string) {
  class GitHubRepositoryMatchingReferences extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    unknown
  > {
    public refName: string;
    constructor(owner: string, repo: string, refName: string) {
      super(token, owner, repo);
      this.refName = refName;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/matching-refs/${this.refName}`;
    }
  }
  return class GitHubRepositoryReferences extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    Endpoints["POST /repos/{owner}/{repo}/git/refs"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/refs`;
    }
    async getMatchingList(refName: string) {
      return await new GitHubRepositoryMatchingReferences(
        this.owner,
        this.repo,
        refName,
      ).getList();
    }
  };
}
