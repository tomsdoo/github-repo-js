import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubIssueComments } from "@/modules/issue-comments";

describe("readyGitHubIssueComments()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const issueNumber = 1;
  let instance: InstanceType<ReturnType<typeof readyGitHubIssueComments>>;

  beforeEach(() => {
    const GitHubIssueComments = readyGitHubIssueComments(token);
    instance = new GitHubIssueComments(owner, repo, issueNumber);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
  });
});
