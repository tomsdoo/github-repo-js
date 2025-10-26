import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubPullCommits } from "@/modules/pull-commits";

describe("readyGitHubPullCommits()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const pullNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubPullCommits>>;

  beforeEach(() => {
    const GitHubPullCommits = readyGitHubPullCommits(token);
    instance = new GitHubPullCommits(owner, repo, pullNumber);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/pulls/${pullNumber}/commits`);
  });
});
