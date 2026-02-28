import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryLatestRelease(token: string) {
  return class extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"] extends (infer T)[] ? T : never,
    never
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/releases/latest`;
    }
  };
}
