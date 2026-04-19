import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubUserRepositories } from "@/modules/user-repositories";

describe("readyGitHubUserRepositories()", () => {
  const token = "dummy";
  let instance: InstanceType<ReturnType<typeof readyGitHubUserRepositories>>;

  beforeEach(() => {
    const GitHubUserRepositories = readyGitHubUserRepositories(token);
    instance = new GitHubUserRepositories();
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", "/user/repos");
  });
});
