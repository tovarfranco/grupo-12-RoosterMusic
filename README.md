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



1. Clone the Repository
2. Go to dev:
   ```bash
   git checkout dev
   ```
   > Note: You will placed in branch dev, where you will start from.

2. For a new feature create a branch:
   ```bash
   git checkout -b <type>/<branch_name>
   ```
   > Note: Replace <type> and <branch_name> for your actual information

3. Work on your changes:
4. Add your changes:
   ```bash
   git add -all
   ```
5. Commit your changes:
   ```bash
   git commit -m <message>
   ```
   > Note: Replace <message> for your actual information
6. Push your changes:
   ```bash
   git push
   ```
   
After you finish your feature you must submit a merge request pointing to **dev** branch
