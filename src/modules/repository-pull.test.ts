import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryPull } from "@/modules/repository-pull";

describe("readyGitHubRepositoryPull()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const pullNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryPull>>;

  beforeEach(() => {
    const GitHubRepositoryPull = readyGitHubRepositoryPull(token);
    instance = new GitHubRepositoryPull(owner, repo, pullNumber);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/pulls/${pullNumber}`,
    );
  });
});
