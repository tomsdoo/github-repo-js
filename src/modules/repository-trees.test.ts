import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryTrees } from "@/modules/repository-trees";

describe("readyGitHubRepositoryTrees()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryTrees>>;

  beforeEach(() => {
    const GitHubUser = readyGitHubRepositoryTrees(token);
    instance = new GitHubUser(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/git/trees`,
    );
  });
});
