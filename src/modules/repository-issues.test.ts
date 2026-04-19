import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryIssues } from "@/modules/repository-issues";

describe("readyGitHubRepositoryIssues()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryIssues>>;

  beforeEach(() => {
    const GitHubRepositoryIssues = readyGitHubRepositoryIssues(token);
    instance = new GitHubRepositoryIssues(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/issues`,
    );
  });
});
