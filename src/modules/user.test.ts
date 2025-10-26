import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubUser } from "@/modules/user";

describe("readyGitHubUser()", () => {
  const token = "dummy";
  let instance: InstanceType<ReturnType<typeof readyGitHubUser>>;

  beforeEach(() => {
    const GitHubUser = readyGitHubUser(token);
    instance = new GitHubUser();
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", "/user");
  });
});
