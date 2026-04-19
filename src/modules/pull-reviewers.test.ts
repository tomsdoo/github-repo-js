import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubPullReviewers } from "@/modules/pull-reviewers";

describe("readyGitHubPullReviewers()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const pullNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubPullReviewers>>;

  beforeEach(() => {
    const GitHubPullReviewers = readyGitHubPullReviewers(token);
    instance = new GitHubPullReviewers(owner, repo, pullNumber);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
    );
  });
});
