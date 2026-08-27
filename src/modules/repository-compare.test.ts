import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryCompare } from "@/modules/repository-compare";

describe("readyGitHubRepositoryCompare()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryCompare>>;

  beforeEach(() => {
    const GitHubRepositoryCompare = readyGitHubRepositoryCompare(token);
    instance = new GitHubRepositoryCompare(owner, repo, "base", "head");
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/compare/base...head`,
    );
  });
});
