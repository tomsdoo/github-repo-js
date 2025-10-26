import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryReleases } from "@/modules/repository-releases";

describe("readyGitHubRepositoryReleases()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryReleases>>;

  beforeEach(() => {
    const GitHubRepositoryReleases = readyGitHubRepositoryReleases(token);
    instance = new GitHubRepositoryReleases(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/releases`);
  });
});
