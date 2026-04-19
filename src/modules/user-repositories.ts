import { GitHubApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubUserRepositories(token: string) {
  return class GitHubUserRepositories extends GitHubApiBase<
    Endpoints["GET /user/repos"]["response"]["data"] extends (infer T)[]
      ? T
      : never,
    Endpoints["POST /user/repos"]["request"]["data"]
  > {
    constructor() {
      super(token);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/user/repos`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
