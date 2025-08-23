import { loopPages } from "@/utils";

const GITHUB_API_ORIGIN = "https://api.github.com";

export class GitHubApiBase<Item, ApiRequestBody> {
  protected token: string;
  constructor(token: string) {
    this.token = token;
  }
  get apiOrigin() {
    return GITHUB_API_ORIGIN;
  }
  get apiEndpoint() {
    return "";
  }
  get requestHeaders() {
    return {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${this.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }
  get pageSizeForRequest() {
    return 10;
  }
  async getPagedList(query?: Record<string, string>) {
    return await loopPages(async ({ per_page, page }) => {
      const url = new URL(this.apiEndpoint);
      const params = {
        ...(query ?? {}),
        per_page,
        page,
      };
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, `${value}`);
      }
      const resultItems: Item[] = await fetch(url, {
        headers: this.requestHeaders,
      }).then(r => r.json());
      return { resultItems };
    }, this.pageSizeForRequest);
  }
  async getList(query?: Record<string, string>) {
    const url = new URL(this.apiEndpoint);
    for (const [key, value] of Object.entries(query ?? {})) {
      url.searchParams.append(key, `${value}`);
    }
    const items: Item[] = await fetch(url, {
      headers: this.requestHeaders,
    }).then(r => r.json());
    return items;
  }
  async get() {
    const item: Item = await fetch(this.apiEndpoint, {
      headers: this.requestHeaders,
    }).then(r => r.json());
    return item;
  }
  async post(body: ApiRequestBody) {
    const item: Item = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: this.requestHeaders,
      body: JSON.stringify(body),
    }).then(r => r.json());
    return item;
  }
  async patch(body: ApiRequestBody) {
    const item: Item = await fetch(this.apiEndpoint, {
      method: "PATCH",
      headers: this.requestHeaders,
      body: JSON.stringify(body),
    }).then(r => r.json());
    return item;
  }
}

export class GitHubRepoApiBase<Item, ApiRequestBody> extends GitHubApiBase<Item, ApiRequestBody> {
  protected owner: string;
  protected repo: string;
  constructor(token: string, owner: string, repo: string) {
    super(token);
    this.owner = owner;
    this.repo = repo;
  }
}

export class GitHubIssueApiBase<Item, ApiRequestBody> extends GitHubRepoApiBase<Item, ApiRequestBody> {
  protected issueNumber: number;
  constructor(token: string, owner: string, repo: string, issueNumber: number) {
    super(token, owner, repo);
    this.issueNumber = issueNumber;
  }
}
