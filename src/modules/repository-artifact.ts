import { GitHubRepoApiBase } from "@/modules/base";
import type { Endpoints } from "@octokit/types";

export function readyGitHubRepositoryArtifact(token: string) {
  return class GitHubRepositoryArtifact extends GitHubRepoApiBase<
    Endpoints["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"]["response"]["data"],
    unknown
  > {
    public artifactId: number;
    constructor(owner: string, repo: string, artifactId: number) {
      super(token, owner, repo);
      this.artifactId = artifactId;
    }
    get apiEndpoint() {
      return `${this.apiOrigin}/repos/${this.owner}/${this.repo}/actions/artifacts/${this.artifactId}`;
    }
    async downloadBlob() {
      const url = `${this.apiEndpoint}/zip`;
      const response = await fetch(url, {
        headers: this.requestHeaders,
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(response.statusText, { cause: { response } });
      }
      return await response.blob();
    }
  };
}
