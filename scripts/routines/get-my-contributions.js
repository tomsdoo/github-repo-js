/**
 * @param {import("./types").WorkContext} context
 * @param {string} startDate
 * @param {string} endDate
 */
export default async function work({ github }, startDateStr, endDateStr) {
  function parseDate(dateStr, defaultDate) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return defaultDate;
    }
    return date;
  }

  const today = new Date();
  const currentWeekMonday = new Date(today);
  currentWeekMonday.setDate(today.getDate() - today.getDay() + 1);
  currentWeekMonday.setHours(0, 0, 0, 0);
  const lastWeekMonday = new Date(currentWeekMonday);
  lastWeekMonday.setDate(currentWeekMonday.getDate() - 7);

  const startDate = parseDate(startDateStr, lastWeekMonday);
  const endDate = parseDate(endDateStr, currentWeekMonday);

  const responseData = await github.graphql.query({
    viewer: {
      login: true,
      contributionsCollection: {
        __args: {
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        },
        totalCommitContributions: true,
        pullRequestContributions: {
          __args: {
            first: 100,
          },
          nodes: {
            occurredAt: true,
            pullRequest: {
              number: true,
              title: true,
              url: true,
              baseRepository: {
                owner: {
                  login: true,
                },
                name: true,
              },
            },
          },
        },
        issueContributions: {
          __args: {
            first: 100,
          },
          nodes: {
            occurredAt: true,
            issue: {
              number: true,
              title: true,
              url: true,
              repository: {
                owner: {
                  login: true,
                },
                name: true,
              },
            },
          },
        },
        pullRequestReviewContributions: {
          __args: {
            first: 100,
          },
          nodes: {
            occurredAt: true,
            pullRequest: {
              number: true,
              title: true,
              url: true,
              baseRepository: {
                owner: {
                  login: true,
                },
                name: true,
              },
            },
          },
        },
      },
    },
  });

  const {
    issueContributions,
    pullRequestContributions,
    pullRequestReviewContributions,
  } = responseData.viewer.contributionsCollection;
  console.log(
    `Contributions from ${startDate.toDateString()} to ${endDate.toDateString()}:`,
  );
  console.log("Pull Request Contributions:");
  const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
  pullRequestContributions.nodes.forEach(({ occurredAt, pullRequest }) => {
    console.log(
      `- [${new Date(occurredAt).toLocaleString(locale, { timeZone })}] ${pullRequest.baseRepository.owner.login}/${pullRequest.baseRepository.name}#${pullRequest.number} ${pullRequest.title} (${pullRequest.url})`,
    );
  });
  console.log("\nIssue Contributions:");
  issueContributions.nodes.forEach(({ occurredAt, issue }) => {
    console.log(
      `- [${new Date(occurredAt).toLocaleString(locale, { timeZone })}] ${issue.repository.owner.login}/${issue.repository.name}#${issue.number} ${issue.title} (${issue.url})`,
    );
  });
  console.log("\nPull Request Review Contributions:");
  pullRequestReviewContributions.nodes.forEach(
    ({ occurredAt, pullRequest }) => {
      console.log(
        `- [${new Date(occurredAt).toLocaleString(locale, { timeZone })}] ${pullRequest.baseRepository.owner.login}/${pullRequest.baseRepository.name}#${pullRequest.number} ${pullRequest.title} (${pullRequest.url})`,
      );
    },
  );
}
