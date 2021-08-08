# Rooster Music 

¿Who we are?

We are a digital company .....
Our objetive is to provide our customer the best experience when buying their instruments or equipments.


# Rooster Music Library

This library contains all the common code used by the Rooster Music team.

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
2. Check the branch you are positioned:
   ```bash
   git status
   ```
   > Note: You will be placed in branch Main. You should start from Dev
3. Go to dev:
   ```bash
   git checkout dev
   ```
   > Note: You will placed in branch dev, where you'll start from.

2. For a new feature/bug/fix/refactor, you'll create a branch:
   ```bash
   git checkout -b <type>/<branch_name>
   ```
   > Note: Replace <type> and <branch_name> for your actual information. i.e: feat/frontend
3. Work on your changes.
4. Add your changes:
   ```bash
   git add --all
   ```
5. Commit your changes:
   ```bash
   git commit -m <type:message>
   ```
   > Note: Replace <type:message> to describe your changes. i.e: feat: New readme added.
6. Push your changes:
   ```bash
   git push
   ```
   > Note: Replace <type:message> to describe your changes. i.e: feat: New readme added.

After you finish your feature you must submit a merge request pointing to **dev** branch