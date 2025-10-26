import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryCommits } from "@/modules/repository-commits";

describe("readyGitHubRepositoryCommits()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryCommits>>;

  beforeEach(() => {
    const GitHubRepositoryCommits = readyGitHubRepositoryCommits(token);
    instance = new GitHubRepositoryCommits(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/commits`);
  });
});
