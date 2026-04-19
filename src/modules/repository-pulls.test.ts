import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryPulls } from "@/modules/repository-pulls";

describe("readyGitHubRepositoryPulls()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryPulls>>;

  beforeEach(() => {
    const GitHubRepositoryPulls = readyGitHubRepositoryPulls(token);
    instance = new GitHubRepositoryPulls(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("has pageSizeForRequest", () => {
    expect(instance).toHaveProperty("pageSizeForRequest", 100);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty(
      "apiEndpoint",
      `/repos/${owner}/${repo}/pulls`,
    );
  });
});
