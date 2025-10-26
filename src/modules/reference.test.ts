import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubReference } from "@/modules/reference";

describe("readyGitHubReference()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const ref = "ref";
  let instance: InstanceType<ReturnType<typeof readyGitHubReference>>;

  beforeEach(() => {
    const GitHubReference = readyGitHubReference(token);
    instance = new GitHubReference(owner, repo, ref);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/refs/${ref}`);
  });
});
