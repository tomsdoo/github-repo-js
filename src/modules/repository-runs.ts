import { GitHubRepoApiBase } from "@/modules/base";
import { loopPages } from "@/utils";
import type { Endpoints } from "@octokit/types";

type RepositoryRun = Endpoints["GET /repos/{owner}/{repo}/actions/runs"]["response"]["data"]["workflow_runs"] extends (infer T)[] ? T : never;

export function readyGitHubRepositoryRuns(token: string) {
  return class extends GitHubRepoApiBase<
    RepositoryRun,
    unknown
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/actions/runs`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: Record<string, string | number>) {
      return await loopPages(async ({ per_page, page }) => {
        const url = new URL(this.apiEndpoint);
        const params = {
          ...(query ?? {}),
          per_page,
          page,
        };
        for (const [key, value] of Object.entries(params)) {
          url.searchParams.append(key, `${value}`);
        }
        const resultItems: RepositoryRun[] = await fetch(url, {
          headers: this.requestHeaders,
          cache: "no-store",
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(response.statusText, {cause: { response }});
          }
          const { workflow_runs } = await response.json();
          return workflow_runs as RepositoryRun[];
        });
        return { resultItems };
      }, this.pageSizeForRequest);
    }
  }
}
