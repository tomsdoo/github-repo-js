import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubReferenceForGet } from "@/modules/reference-get";

describe("readyGitHubReferenceForGet()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const ref = "ref";
  let instance: InstanceType<ReturnType<typeof readyGitHubReferenceForGet>>;

  beforeEach(() => {
    const GitHubReferenceForGet = readyGitHubReferenceForGet(token);
    instance = new GitHubReferenceForGet(owner, repo, ref);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/ref/${ref}`);
  });
});
