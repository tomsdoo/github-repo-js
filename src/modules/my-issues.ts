import { GitHubApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubMyIssues(token: string) {
  return class extends GitHubApiBase<
    Endpoints["GET /issues"]["response"]["data"] extends (infer T)[] ? T : never,
    unknown
  > {
    constructor() {
      super(token);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/issues`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string>) {
      return await this.getPagedList(query);
    }
  };
}
