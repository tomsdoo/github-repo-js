import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubBlobs } from "@/modules/blobs";

describe("readyGitHubBlobs()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  let instance: InstanceType<ReturnType<typeof readyGitHubBlobs>>;

  beforeEach(() => {
    const GitHubBlobs = readyGitHubBlobs(token);
    instance = new GitHubBlobs(owner, repo);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/blobs`);
  });
});
