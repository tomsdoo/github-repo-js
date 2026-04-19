import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubBlobs(token: string) {
  return class GitHubBlobs extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"]["response"]["data"],
    Endpoints["POST /repos/{owner}/{repo}/git/blobs"]["request"]["data"]
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/blobs`;
    }
  };
}
