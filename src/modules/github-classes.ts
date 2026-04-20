import { readyGitHubMyIssues } from "@/modules/my-issues";
import { readyGitHubOrganizationRepositories } from "@/modules/organization-repositories";
import { readyGitHubRepository } from "@/modules/repository";
import { readyGitHubRepositoryIssues } from "@/modules/repository-issues";
import { readyGitHubUser } from "@/modules/user";
import { readyGitHubUserOrganizations } from "@/modules/user-organizations";
import { readyGitHubUserRepositories } from "@/modules/user-repositories";
import { readyGitHubGraphQL } from "@/modules/graphql";

export function readyGitHubClasses(token: string) {
  return {
    GitHubMyIssues: readyGitHubMyIssues(token),
    GitHubOrganizationRepositories: readyGitHubOrganizationRepositories(token),
    GitHubRepository: readyGitHubRepository(token),
    GitHubRepositoryIssues: readyGitHubRepositoryIssues(token),
    GitHubUser: readyGitHubUser(token),
    GitHubUserOrganizations: readyGitHubUserOrganizations(token),
    GitHubUserRepositories: readyGitHubUserRepositories(token),
    GitHubGraphQL: readyGitHubGraphQL(token),
  };
}
