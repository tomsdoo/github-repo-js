import { readyGitHubClasses } from "@/modules/github-classes";
import { createClient } from "@/generated/github";

export class GitHubFacade {
  protected token: string;
  protected githubClasses: ReturnType<typeof readyGitHubClasses>;
  constructor(token: string) {
    this.token = token;
    this.githubClasses = readyGitHubClasses(token);
  }
  get graphql() {
    return createClient({
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });
  }
  async getMe() {
    return await new this.githubClasses.GitHubUser().get();
  }
  async getMyOrganizations() {
    const {
      GitHubUserOrganizations,
      GitHubOrganizationRepositories,
    } = this.githubClasses;
    const organizations = await new GitHubUserOrganizations().getList();
    return organizations.map(organization => ({
      ...organization,
      async getRepositories() {
        return await new GitHubOrganizationRepositories(organization.login).getList();
      },
    }));
  }
  async getMyRepositories() {
    const {
      GitHubUserRepositories,
      GitHubRepositoryIssues,
    } = this.githubClasses;
    const repos = await new GitHubUserRepositories().getList();
    return repos.map(repo => ({
      ...repo,
      async getIssues() {
        return await new GitHubRepositoryIssues(repo.owner.login, repo.name).getList();
      },
      async postIssue(...params: Parameters<(typeof GitHubRepositoryIssues)["prototype"]["post"]>) {
        return await new GitHubRepositoryIssues(repo.owner.login, repo.name).post(...params);
      }
    }));
  }
  async getMyIssues() {
    const {
      GitHubMyIssues,
    } = this.githubClasses;
    const issues = await new GitHubMyIssues().getList();
    return issues;
  }
  repo(owner: string, repo: string) {
    const { GitHubRepository } = this.githubClasses;
    return new GitHubRepository(owner, repo);
  }
  async queryGraphQL<T>(query: string, variables?: Record<string, any>) {
    return await new this.githubClasses.GitHubGraphQL().doQuery<T>({ query, variables });
  }
}
