import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryLatestRelease } from "@/modules/repository-latest-release";

describe("readyGitHubRepositoryLatestRelease()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const pullNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryLatestRelease>>;

  beforeEach(() => {
    const GitHubRepositoryLatestRelease = readyGitHubRepositoryLatestRelease(token);
    instance = new GitHubRepositoryLatestRelease(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/releases/latest`);
  });
});
