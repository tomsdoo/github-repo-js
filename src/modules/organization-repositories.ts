import { GitHubApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubOrganizationRepositories(token: string) {
  return class extends GitHubApiBase<
    Endpoints["GET /orgs/{org}/repos"]["response"]["data"] extends (infer T)[] ? T : never,
    Endpoints["POST /orgs/{org}/repos"]["request"]["data"]
  > {
    public org: string;
    constructor(org: string) {
      super(token);
      this.org = org;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/orgs/${this.org}/repos`;
    }
  }
}
