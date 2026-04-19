import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubUserOrganizations } from "@/modules/user-organizations";

describe("readyGitHubUserOrganizations()", () => {
  const token = "dummy";
  let instance: InstanceType<ReturnType<typeof readyGitHubUserOrganizations>>;

  beforeEach(() => {
    const GitHubUserOrganizations = readyGitHubUserOrganizations(token);
    instance = new GitHubUserOrganizations();
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");
  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", "/user/orgs");
  });
});
