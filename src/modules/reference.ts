import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubReference(token: string) {
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/git/ref/{ref}"]["response"]["data"],
    Endpoints["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]["request"]["data"]
  > {
    protected ref: string;
    constructor(owner: string, repo: string, ref: string) {
      super(token, owner, repo);
      this.ref = ref;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/git/ref/${this.ref}`;
    }
  };
}
