# Music Library

This library contains all the common code used by the Rooster Music team

## How to contribute

### Version control

Your commits should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with these [types](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

- feat
- fix
- ci
- docs
- chore
- tests
- perf
- refactor

You should branch from **dev**, and your branch name should follow this rule **< type >/< task_description >** i.e. **feat/frontend**



1. Create a gitlab [personal token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) with the `read_api` scope.
2. Execute:
   ```bash
   git checkout -b feat/branch
   ```
   > Note: Replace <personal_access_token_name> and <personal_access_token> for your actual information


After you finish your feature you must submit a merge request pointing to **dev** branch
