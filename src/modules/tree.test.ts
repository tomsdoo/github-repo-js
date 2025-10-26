import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubTree } from "@/modules/tree";

describe("readyGitHubUser()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const treeSha = "treeSha";
  let instance: InstanceType<ReturnType<typeof readyGitHubTree>>;

  beforeEach(() => {
    const GitHubTree = readyGitHubTree(token);
    instance = new GitHubTree(owner, repo, treeSha);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("has treeSha", () => {
    expect(instance).toHaveProperty("treeSha", treeSha);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=true`);
  });
});
