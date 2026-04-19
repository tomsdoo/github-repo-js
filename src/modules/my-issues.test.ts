import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubMyIssues } from "@/modules/my-issues";

describe("readyGitHubMyIssues()", () => {
  const token = "dummy";
  let instance: InstanceType<ReturnType<typeof readyGitHubMyIssues>>;

  beforeEach(() => {
    const GitHubMyIssues = readyGitHubMyIssues(token);
    instance = new GitHubMyIssues();
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/issues`);
  });
});
