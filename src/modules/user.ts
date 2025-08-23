import { GitHubApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubUser(token: string) {
  return class GitHubUser extends GitHubApiBase<
    Endpoints["GET /user"]["response"]["data"],
    { blog?: string; name?: string; }
  > {
    constructor() {
      super(token);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/user`;
    }
  };
}
