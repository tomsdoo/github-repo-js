import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryBranches } from "@/modules/repository-branches";

describe("readyGitHubRepositoryBranches()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryBranches>>;

  beforeEach(() => {
    const GitHubRepositoryBranches = readyGitHubRepositoryBranches(token);
    instance = new GitHubRepositoryBranches(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/branches`);
  });
});
