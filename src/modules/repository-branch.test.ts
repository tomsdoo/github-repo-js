import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryBranch } from "@/modules/repository-branch";

describe("readyGitHubRepositoryBranches()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const branch = "branch";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryBranch>>;

  beforeEach(() => {
    const GitHubRepositoryBranch = readyGitHubRepositoryBranch(token);
    instance = new GitHubRepositoryBranch(owner, repo, branch);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/branches/${branch}`,
    );
  });
});
