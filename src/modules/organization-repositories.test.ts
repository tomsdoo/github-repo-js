import { beforeEach, describe, it, expect, vi } from "vitest";
import { readyGitHubOrganizationRepositories } from "@/modules/organization-repositories";

describe("readyGitHubOrganizationRepositories()", () => {
  const token = "dummy";
  const org = "org";
  let instance: InstanceType<ReturnType<typeof readyGitHubOrganizationRepositories>>;

  beforeEach(() => {
    const GitHubOrganizationRepositories = readyGitHubOrganizationRepositories(token);
    instance = new GitHubOrganizationRepositories(org);
    vi.spyOn(instance, "apiOrigin", "get").mockReturnValue("");

  });
  it("has token", () => {
    expect(instance).toHaveProperty("token", token);
  });
  it("apiEndPoint is correct", () => {
    expect(instance).toHaveProperty("apiEndpoint", `/orgs/${org}/repos`);
  });
});
