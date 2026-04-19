import { GitHubRepoApiBase } from "@/modules/base";
import { loopPages } from "@/utils";
import type { Endpoints } from "@octokit/types";

type Artifact = Endpoints["GET /repos/{owner}/{repo}/actions/artifacts"]["response"]["data"]["artifacts"] extends (infer T)[] ? T : never;

export function readyGitHubRepositoryArtifacts(token: string) {
  return class GitHubRepositoryArtifacts extends GitHubRepoApiBase<
    Artifact,
    unknown
  > {
    constructor(owner: string, repo: string) {
      super(token, owner, repo);
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/actions/artifacts`;
    }
    get pageSizeForRequest() {
      return 100;
    }
    async getList(query?: {name: string }) {
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
        const resultItems: Artifact[] = await fetch(url, {
          headers: this.requestHeaders,
          cache: "no-store",
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(response.statusText, {cause: { response }});
          }
          const { artifacts } = await response.json();
          return artifacts as Artifact[];
        });
        return { resultItems };
      }, this.pageSizeForRequest);
    }
  }
}
