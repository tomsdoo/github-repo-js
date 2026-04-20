export function readyGitHubGraphQL(token: string) {
  return class GitHubGraphQL {
    get apiEndpoint() {
      return "https://api.github.com/graphql";
    }
    async doQuery<T = unknown>(requestData: { query: string; variables?: Record<string, unknown> }) {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) {
        throw new Error(`GitHub GraphQL API request failed with status ${response.status}`);
      }
      return await response.json() as T;
    }
  };
}
