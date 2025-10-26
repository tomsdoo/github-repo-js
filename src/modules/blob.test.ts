import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubBlob } from "@/modules/blob";

describe("readyGitHubBlob()", () => {
  const token = "dummy";
  const owner = "owner";
  const repo = "repo";
  const fileSha = "fileSha";
  let instance: InstanceType<ReturnType<typeof readyGitHubBlob>>;

  beforeEach(() => {
    const GitHubBlob = readyGitHubBlob(token);
    instance = new GitHubBlob(owner, repo, fileSha);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/repos/${owner}/${repo}/git/blobs/${fileSha}`);
  });
});
