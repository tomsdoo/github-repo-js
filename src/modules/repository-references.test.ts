import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubRepositoryReferences } from "@/modules/repository-references";

describe("readyGitHubRepositoryReferences()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubRepositoryReferences>>;

  beforeEach(() => {
    const GitHubRepositoryReferences = readyGitHubRepositoryReferences(token);
    instance = new GitHubRepositoryReferences(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/refs`);
  });
});
