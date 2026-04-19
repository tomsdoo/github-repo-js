import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubTree(token: string) {
  return class GitHubTree extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"],
    unknown
  > {
    public treeSha: string;
    constructor(owner: string, repo: string, treeSha: string) {
      super(token, owner, repo);
      this.treeSha = treeSha;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/trees/${this.treeSha}?recursive=true`;
    }
  };
}
