import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubIssue } from "@/modules/issue";

describe("readyGitHubIssue()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const issueNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubIssue>>;

  beforeEach(() => {
    const GitHubIssue = readyGitHubIssue(token);
    instance = new GitHubIssue(owner, repo, issueNumber);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/issues/${issueNumber}`);
  });
});
