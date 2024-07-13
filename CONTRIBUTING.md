# Contributing

Contribution of code improvements to this library are most welcome. Here are some steps to follow.

## Found a bug?

- Check that an issue does not already exist for the bug -- let's not duplicate effort!
- Create a new issue, if none exists
- Create a pull request

## Creating a Pull Request

- Fork the project and do your work within your fork
- Create a topic branch with your changes
  - Only make changes relevant to your issue
  - Follow existing code patterns, style, and formatting
- Use conventional commits in your commit messages

- Create a pull request
  - The PR should be created in your own fork
  - However, the base repository of the PR should be this project, not your fork

## Use Conventional Commits

- Your commits should follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format

- If you have not used conventional commits in your feature branch, you may still contribute. In this case, please format your PR title and description in the conventional commit format. This will help the creating of an appropriately formatted merge commit.

- The conventional commit format is as follows

  `<type>[(<scope>)][!]: <description>`

  e.g.

  `feat: add batch function to allow atomic changes`

- Valid PR types are

  - **build** _e.g. changes to build systems_
  - **chore** _e.g. updating dependencies_
  - **ci** _e.g. changes to package release_
  - **docs** _e.g. improved documentation_
  - **feat** _e.g. adding a new feature_
  - **fix** _e.g. fixing non-conforming behaviour_
  - **perf** _e.g. improving memory efficiency_
  - **refactor** _e.g. restructuring code_
  - **revert** _e.g. rolling back a bad code change_
  - **style** _e.g. fixing inconsistent formatting of code_
  - **test** _e.g. adding a missing test_

- The format of the PR body should be as follows

  ```
  [free-form body]

  [BREAKING CHANGE: description]

  [other git trailer-formatted footers]
  ```

- Commit titles should always be written in imperative present tense, e.g. _add batch function to allow atomic changes_

- Commit titles should be written in lower case whenever possible, but the casing of any program identifiers must be retained

- Every breaking change must be signalled with a `BREAKING CHANGE` footer in the message body, and a text description must be provided, as this will be automatically recorded in the CHANGELOG.md file

- Breaking changes can be also be signalled with the allowed exclamation mark (!) in the commit title, but a `BREAKING CHANGE` footer and description are still required
