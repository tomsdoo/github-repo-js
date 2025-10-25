import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubBlob(token: string) {
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"]["response"]["data"],
    Endpoints["POST /repos/{owner}/{repo}/git/blobs"]["request"]["data"]
  > {
    public fileSha: string;
    constructor(owner: string, repo: string, fileSha: string) {
      super(token, owner, repo);
      this.fileSha = fileSha;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/blobs/${this.fileSha}`;
    }
  };
}
