import { GitHubApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubUserOrganizations(token: string) {
  return class GitHubUserOrganizations extends GitHubApiBase<
    Endpoints["GET /user/orgs"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    {}
  > {
    constructor() {
      super(token);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/user/orgs`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
