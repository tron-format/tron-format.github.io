import type { Dataset } from "./types";

const githubMcpTools: Dataset = {
  name: "github-mcp-tools",
  label: "Github MCP Tools List",
  description: "A dataset containing an array of non-uniform nested objects.",
  analysis: "This is a practical example for sending JSON inputs to LLMs!",
  source: "https://gist.github.com/didier-durand/2970be82fec6c84d522f7953ac7881b4",
  dateRetrieved: "2025-11-29",
  data: [
    {
      "inputSchema": {
        "json": {
          "properties": {
            "body": {
              "description": "Comment content",
              "type": "string"
            },
            "issue_number": {
              "description": "Issue number to comment on",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "issue_number",
            "body"
          ],
          "type": "object"
        }
      },
      "name": "add_issue_comment",
      "description": "Add a comment to a specific issue in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "body": {
              "description": "The text of the review comment",
              "type": "string"
            },
            "line": {
              "description": "The line of the blob in the pull request diff that the comment applies to. For multi-line comments, the last line of the range",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "path": {
              "description": "The relative path to the file that necessitates a comment",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "side": {
              "description": "The side of the diff to comment on. LEFT indicates the previous state, RIGHT indicates the new state",
              "enum": [
                "LEFT",
                "RIGHT"
              ],
              "type": "string"
            },
            "startLine": {
              "description": "For multi-line comments, the first line of the range that the comment applies to",
              "type": "number"
            },
            "startSide": {
              "description": "For multi-line comments, the starting side of the diff that the comment applies to. LEFT indicates the previous state, RIGHT indicates the new state",
              "enum": [
                "LEFT",
                "RIGHT"
              ],
              "type": "string"
            },
            "subjectType": {
              "description": "The level at which the comment is targeted",
              "enum": [
                "FILE",
                "LINE"
              ],
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber",
            "path",
            "body",
            "subjectType"
          ],
          "type": "object"
        }
      },
      "name": "add_pull_request_review_comment_to_pending_review",
      "description": "Add a comment to the requester's latest pending pull request review, a pending review needs to already exist to call this (check with the user if not sure)."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "issueNumber": {
              "description": "Issue number",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "issueNumber"
          ],
          "type": "object"
        }
      },
      "name": "assign_copilot_to_issue",
      "description": "Assign Copilot to a specific issue in a GitHub repository.\n\nThis tool can help with the following outcomes:\n- a Pull Request created with source code changes to resolve the issue\n\n\nMore information can be found at:\n- https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/about-assigning-tasks-to-copilot\n"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "body": {
              "description": "Review comment text",
              "type": "string"
            },
            "commitID": {
              "description": "SHA of commit to review",
              "type": "string"
            },
            "event": {
              "description": "Review action to perform",
              "enum": [
                "APPROVE",
                "REQUEST_CHANGES",
                "COMMENT"
              ],
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber",
            "body",
            "event"
          ],
          "type": "object"
        }
      },
      "name": "create_and_submit_pull_request_review",
      "description": "Create and submit a review for a pull request without review comments."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "branch": {
              "description": "Name for new branch",
              "type": "string"
            },
            "from_branch": {
              "description": "Source branch (defaults to repo default)",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "branch"
          ],
          "type": "object"
        }
      },
      "name": "create_branch",
      "description": "Create a new branch in a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "assignees": {
              "description": "Usernames to assign to this issue",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "body": {
              "description": "Issue body content",
              "type": "string"
            },
            "labels": {
              "description": "Labels to apply to this issue",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "milestone": {
              "description": "Milestone number",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "title": {
              "description": "Issue title",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "title"
          ],
          "type": "object"
        }
      },
      "name": "create_issue",
      "description": "Create a new issue in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "branch": {
              "description": "Branch to create/update the file in",
              "type": "string"
            },
            "content": {
              "description": "Content of the file",
              "type": "string"
            },
            "message": {
              "description": "Commit message",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner (username or organization)",
              "type": "string"
            },
            "path": {
              "description": "Path where to create/update the file",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "sha": {
              "description": "SHA of file being replaced (for updates)",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "path",
            "content",
            "message",
            "branch"
          ],
          "type": "object"
        }
      },
      "name": "create_or_update_file",
      "description": "Create or update a single file in a GitHub repository. If updating, you must provide the SHA of the file you want to update."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "commitID": {
              "description": "SHA of commit to review",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "create_pending_pull_request_review",
      "description": "Create a pending review for a pull request. Call this first before attempting to add comments to a pending review, and ultimately submitting it. A pending pull request review means a pull request review, it is pending because you create it first and submit it later, and the PR author will not see it until it is submitted."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "base": {
              "description": "Branch to merge into",
              "type": "string"
            },
            "body": {
              "description": "PR description",
              "type": "string"
            },
            "draft": {
              "description": "Create as draft PR",
              "type": "boolean"
            },
            "head": {
              "description": "Branch containing changes",
              "type": "string"
            },
            "maintainer_can_modify": {
              "description": "Allow maintainer edits",
              "type": "boolean"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "title": {
              "description": "PR title",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "title",
            "head",
            "base"
          ],
          "type": "object"
        }
      },
      "name": "create_pull_request",
      "description": "Create a new pull request in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "autoInit": {
              "description": "Initialize with README",
              "type": "boolean"
            },
            "description": {
              "description": "Repository description",
              "type": "string"
            },
            "name": {
              "description": "Repository name",
              "type": "string"
            },
            "private": {
              "description": "Whether repo should be private",
              "type": "boolean"
            }
          },
          "required": [
            "name"
          ],
          "type": "object"
        }
      },
      "name": "create_repository",
      "description": "Create a new GitHub repository in your account"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "branch": {
              "description": "Branch to delete the file from",
              "type": "string"
            },
            "message": {
              "description": "Commit message",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner (username or organization)",
              "type": "string"
            },
            "path": {
              "description": "Path to the file to delete",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "path",
            "message",
            "branch"
          ],
          "type": "object"
        }
      },
      "name": "delete_file",
      "description": "Delete a file from a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "delete_pending_pull_request_review",
      "description": "Delete the requester's latest pending pull request review. Use this after the user decides not to submit a pending review, if you don't know if they already created one then check first."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "state": {
              "description": "The new state of the notification (read/done)",
              "enum": [
                "read",
                "done"
              ],
              "type": "string"
            },
            "threadID": {
              "description": "The ID of the notification thread",
              "type": "string"
            }
          },
          "required": [
            "threadID"
          ],
          "type": "object"
        }
      },
      "name": "dismiss_notification",
      "description": "Dismiss a notification by marking it as read or done"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "organization": {
              "description": "Organization to fork to",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "fork_repository",
      "description": "Fork a GitHub repository to your account or specified organization"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "alertNumber": {
              "description": "The number of the alert.",
              "type": "number"
            },
            "owner": {
              "description": "The owner of the repository.",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository.",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "alertNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_code_scanning_alert",
      "description": "Get details of a specific code scanning alert in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "sha": {
              "description": "Commit SHA, branch name, or tag name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "sha"
          ],
          "type": "object"
        }
      },
      "name": "get_commit",
      "description": "Get details for a commit from a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "branch": {
              "description": "Branch to get contents from",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner (username or organization)",
              "type": "string"
            },
            "path": {
              "description": "Path to file/directory (directories must end with a slash '/')",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "path"
          ],
          "type": "object"
        }
      },
      "name": "get_file_contents",
      "description": "Get the contents of a file or directory from a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "issue_number": {
              "description": "The number of the issue",
              "type": "number"
            },
            "owner": {
              "description": "The owner of the repository",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "issue_number"
          ],
          "type": "object"
        }
      },
      "name": "get_issue",
      "description": "Get details of a specific issue in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "issue_number": {
              "description": "Issue number",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number",
              "type": "number"
            },
            "per_page": {
              "description": "Number of records per page",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "issue_number"
          ],
          "type": "object"
        }
      },
      "name": "get_issue_comments",
      "description": "Get comments for a specific issue in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "reason": {
              "description": "Optional: the reason for requesting the user information",
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "name": "get_me",
      "description": "Get details of the authenticated GitHub user. Use this when a request includes \"me\", \"my\". The output will not change unless the user changes their profile, so only call this once."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "notificationID": {
              "description": "The ID of the notification",
              "type": "string"
            }
          },
          "required": [
            "notificationID"
          ],
          "type": "object"
        }
      },
      "name": "get_notification_details",
      "description": "Get detailed information for a specific GitHub notification, always call this tool when the user asks for details about a specific notification, if you don't know the ID list notifications first."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request",
      "description": "Get details of a specific pull request in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request_comments",
      "description": "Get comments for a specific pull request."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request_diff",
      "description": "Get the diff of a pull request."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request_files",
      "description": "Get the files changed in a specific pull request."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request_reviews",
      "description": "Get reviews for a specific pull request."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_pull_request_status",
      "description": "Get the status of a specific pull request."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "alertNumber": {
              "description": "The number of the alert.",
              "type": "number"
            },
            "owner": {
              "description": "The owner of the repository.",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository.",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "alertNumber"
          ],
          "type": "object"
        }
      },
      "name": "get_secret_scanning_alert",
      "description": "Get details of a specific secret scanning alert in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "tag": {
              "description": "Tag name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "tag"
          ],
          "type": "object"
        }
      },
      "name": "get_tag",
      "description": "Get details about a specific git tag in a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_branches",
      "description": "List branches in a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "The owner of the repository.",
              "type": "string"
            },
            "ref": {
              "description": "The Git reference for the results you want to list.",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository.",
              "type": "string"
            },
            "severity": {
              "description": "Filter code scanning alerts by severity",
              "enum": [
                "critical",
                "high",
                "medium",
                "low",
                "warning",
                "note",
                "error"
              ],
              "type": "string"
            },
            "state": {
              "default": "open",
              "description": "Filter code scanning alerts by state. Defaults to open",
              "enum": [
                "open",
                "closed",
                "dismissed",
                "fixed"
              ],
              "type": "string"
            },
            "tool_name": {
              "description": "The name of the tool used for code scanning.",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_code_scanning_alerts",
      "description": "List code scanning alerts in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "sha": {
              "description": "SHA or Branch name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_commits",
      "description": "Get list of commits of a branch in a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "direction": {
              "description": "Sort direction",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            },
            "labels": {
              "description": "Filter by labels",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "since": {
              "description": "Filter by date (ISO 8601 timestamp)",
              "type": "string"
            },
            "sort": {
              "description": "Sort order",
              "enum": [
                "created",
                "updated",
                "comments"
              ],
              "type": "string"
            },
            "state": {
              "description": "Filter by state",
              "enum": [
                "open",
                "closed",
                "all"
              ],
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_issues",
      "description": "List issues in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "before": {
              "description": "Only show notifications updated before the given time (ISO 8601 format)",
              "type": "string"
            },
            "filter": {
              "description": "Filter notifications to, use default unless specified. Read notifications are ones that have already been acknowledged by the user. Participating notifications are those that the user is directly involved in, such as issues or pull requests they have commented on or created.",
              "enum": [
                "default",
                "include_read_notifications",
                "only_participating"
              ],
              "type": "string"
            },
            "owner": {
              "description": "Optional repository owner. If provided with repo, only notifications for this repository are listed.",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Optional repository name. If provided with owner, only notifications for this repository are listed.",
              "type": "string"
            },
            "since": {
              "description": "Only show notifications updated after the given time (ISO 8601 format)",
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "name": "list_notifications",
      "description": "Lists all GitHub notifications for the authenticated user, including unread notifications, mentions, review requests, assignments, and updates on issues or pull requests. Use this tool whenever the user asks what to work on next, requests a summary of their GitHub activity, wants to see pending reviews, or needs to check for new updates or tasks. This tool is the primary way to discover actionable items, reminders, and outstanding work on GitHub. Always call this tool when asked what to work on next, what is pending, or what needs attention in GitHub."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "base": {
              "description": "Filter by base branch",
              "type": "string"
            },
            "direction": {
              "description": "Sort direction",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            },
            "head": {
              "description": "Filter by head user/org and branch",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "sort": {
              "description": "Sort by",
              "enum": [
                "created",
                "updated",
                "popularity",
                "long-running"
              ],
              "type": "string"
            },
            "state": {
              "description": "Filter by state",
              "enum": [
                "open",
                "closed",
                "all"
              ],
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_pull_requests",
      "description": "List pull requests in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "The owner of the repository.",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository.",
              "type": "string"
            },
            "resolution": {
              "description": "Filter by resolution",
              "enum": [
                "false_positive",
                "wont_fix",
                "revoked",
                "pattern_edited",
                "pattern_deleted",
                "used_in_tests"
              ],
              "type": "string"
            },
            "secret_type": {
              "description": "A comma-separated list of secret types to return. All default secret patterns are returned. To return generic patterns, pass the token name(s) in the parameter.",
              "type": "string"
            },
            "state": {
              "description": "Filter by state",
              "enum": [
                "open",
                "resolved"
              ],
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_secret_scanning_alerts",
      "description": "List secret scanning alerts in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo"
          ],
          "type": "object"
        }
      },
      "name": "list_tags",
      "description": "List git tags in a GitHub repository"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "action": {
              "description": "Action to perform: ignore, watch, or delete the notification subscription.",
              "enum": [
                "ignore",
                "watch",
                "delete"
              ],
              "type": "string"
            },
            "notificationID": {
              "description": "The ID of the notification thread.",
              "type": "string"
            }
          },
          "required": [
            "notificationID",
            "action"
          ],
          "type": "object"
        }
      },
      "name": "manage_notification_subscription",
      "description": "Manage a notification subscription: ignore, watch, or delete a notification thread subscription."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "action": {
              "description": "Action to perform: ignore, watch, or delete the repository notification subscription.",
              "enum": [
                "ignore",
                "watch",
                "delete"
              ],
              "type": "string"
            },
            "owner": {
              "description": "The account owner of the repository.",
              "type": "string"
            },
            "repo": {
              "description": "The name of the repository.",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "action"
          ],
          "type": "object"
        }
      },
      "name": "manage_repository_notification_subscription",
      "description": "Manage a repository notification subscription: ignore, watch, or delete repository notifications subscription for the provided repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "lastReadAt": {
              "description": "Describes the last point that notifications were checked (optional). Default: Now",
              "type": "string"
            },
            "owner": {
              "description": "Optional repository owner. If provided with repo, only notifications for this repository are marked as read.",
              "type": "string"
            },
            "repo": {
              "description": "Optional repository name. If provided with owner, only notifications for this repository are marked as read.",
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "name": "mark_all_notifications_read",
      "description": "Mark all notifications as read"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "commit_message": {
              "description": "Extra detail for merge commit",
              "type": "string"
            },
            "commit_title": {
              "description": "Title for merge commit",
              "type": "string"
            },
            "merge_method": {
              "description": "Merge method",
              "enum": [
                "merge",
                "squash",
                "rebase"
              ],
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "merge_pull_request",
      "description": "Merge a pull request in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "branch": {
              "description": "Branch to push to",
              "type": "string"
            },
            "files": {
              "description": "Array of file objects to push, each object with path (string) and content (string)",
              "items": {
                "additionalProperties": false,
                "properties": {
                  "content": {
                    "description": "file content",
                    "type": "string"
                  },
                  "path": {
                    "description": "path to the file",
                    "type": "string"
                  }
                },
                "required": [
                  "path",
                  "content"
                ],
                "type": "object"
              },
              "type": "array"
            },
            "message": {
              "description": "Commit message",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "branch",
            "files",
            "message"
          ],
          "type": "object"
        }
      },
      "name": "push_files",
      "description": "Push multiple files to a GitHub repository in a single commit"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "request_copilot_review",
      "description": "Request a GitHub Copilot code review for a pull request. Use this for automated feedback on pull requests, usually before requesting a human reviewer."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "order": {
              "description": "Sort order",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "q": {
              "description": "Search query using GitHub code search syntax",
              "type": "string"
            },
            "sort": {
              "description": "Sort field ('indexed' only)",
              "type": "string"
            }
          },
          "required": [
            "q"
          ],
          "type": "object"
        }
      },
      "name": "search_code",
      "description": "Search for code across GitHub repositories"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "order": {
              "description": "Sort order",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "q": {
              "description": "Search query using GitHub issues search syntax",
              "type": "string"
            },
            "sort": {
              "description": "Sort field by number of matches of categories, defaults to best match",
              "enum": [
                "comments",
                "reactions",
                "reactions-+1",
                "reactions--1",
                "reactions-smile",
                "reactions-thinking_face",
                "reactions-heart",
                "reactions-tada",
                "interactions",
                "created",
                "updated"
              ],
              "type": "string"
            }
          },
          "required": [
            "q"
          ],
          "type": "object"
        }
      },
      "name": "search_issues",
      "description": "Search for issues in GitHub repositories."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "query": {
              "description": "Search query",
              "type": "string"
            }
          },
          "required": [
            "query"
          ],
          "type": "object"
        }
      },
      "name": "search_repositories",
      "description": "Search for GitHub repositories"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "order": {
              "description": "Sort order",
              "enum": [
                "asc",
                "desc"
              ],
              "type": "string"
            },
            "page": {
              "description": "Page number for pagination (min 1)",
              "minimum": 1,
              "type": "number"
            },
            "perPage": {
              "description": "Results per page for pagination (min 1, max 100)",
              "maximum": 100,
              "minimum": 1,
              "type": "number"
            },
            "q": {
              "description": "Search query using GitHub users search syntax",
              "type": "string"
            },
            "sort": {
              "description": "Sort field by category",
              "enum": [
                "followers",
                "repositories",
                "joined"
              ],
              "type": "string"
            }
          },
          "required": [
            "q"
          ],
          "type": "object"
        }
      },
      "name": "search_users",
      "description": "Search for GitHub users"
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "body": {
              "description": "The text of the review comment",
              "type": "string"
            },
            "event": {
              "description": "The event to perform",
              "enum": [
                "APPROVE",
                "REQUEST_CHANGES",
                "COMMENT"
              ],
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber",
            "event"
          ],
          "type": "object"
        }
      },
      "name": "submit_pending_pull_request_review",
      "description": "Submit the requester's latest pending pull request review, normally this is a final step after creating a pending review, adding comments first, unless you know that the user already did the first two steps, you should check before calling this."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "assignees": {
              "description": "New assignees",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "body": {
              "description": "New description",
              "type": "string"
            },
            "issue_number": {
              "description": "Issue number to update",
              "type": "number"
            },
            "labels": {
              "description": "New labels",
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "milestone": {
              "description": "New milestone number",
              "type": "number"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "state": {
              "description": "New state",
              "enum": [
                "open",
                "closed"
              ],
              "type": "string"
            },
            "title": {
              "description": "New title",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "issue_number"
          ],
          "type": "object"
        }
      },
      "name": "update_issue",
      "description": "Update an existing issue in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "base": {
              "description": "New base branch name",
              "type": "string"
            },
            "body": {
              "description": "New description",
              "type": "string"
            },
            "maintainer_can_modify": {
              "description": "Allow maintainer edits",
              "type": "boolean"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number to update",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            },
            "state": {
              "description": "New state",
              "enum": [
                "open",
                "closed"
              ],
              "type": "string"
            },
            "title": {
              "description": "New title",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "update_pull_request",
      "description": "Update an existing pull request in a GitHub repository."
    },
    {
      "inputSchema": {
        "json": {
          "properties": {
            "expectedHeadSha": {
              "description": "The expected SHA of the pull request's HEAD ref",
              "type": "string"
            },
            "owner": {
              "description": "Repository owner",
              "type": "string"
            },
            "pullNumber": {
              "description": "Pull request number",
              "type": "number"
            },
            "repo": {
              "description": "Repository name",
              "type": "string"
            }
          },
          "required": [
            "owner",
            "repo",
            "pullNumber"
          ],
          "type": "object"
        }
      },
      "name": "update_pull_request_branch",
      "description": "Update the branch of a pull request with the latest changes from the base branch."
    }
  ]
}

export default githubMcpTools;
