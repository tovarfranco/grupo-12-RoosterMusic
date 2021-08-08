# Rooster Music 

<img src="images/Logo.JPG" width="400">

## About us

We are a digital company set in United States focused on improving the experience when looking for new music equipments. 
Our objetive is to provide our clients with the best way of 

## The team

Franco

Alan

Nazareno

## Jira Board

https://rooster-music.atlassian.net/jira/software/projects/RM/boards/1/backlog

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
   ```bash
   git clone https://github.com/tovarfranco/grupo-12-RoosterMusic.git
   ```
   > Note: You can obtain the url from Code.
2. Check the branch you are positioned:
   ```bash
   git status
   ```
   > Note: You will be placed in branch Main. You should start from Dev
3. Go to dev:
   ```bash
   git checkout dev
   ```
   > Note: You will be placed in branch Dev, where you'll start from.
4. For a new feature/bug/fix/refactor, you'll create a branch:
   ```bash
   git checkout -b <type>/<branch_name>
   ```
   > Note: Replace <type> and <branch_name> for your actual information. i.e: feat/frontend
5. Work on your changes.
6. Add your changes:
   ```bash
   git add --all
   ```
7. Commit your changes:
   ```bash
   git commit -m <type:message>
   ```
   > Note: Replace <type:message> to describe your changes. i.e: feat: New readme added.
8. Push your changes:
   ```bash
   git push
   ```
   > Note: You will may be required to set upstream. i.e: git push --set-upstream origin feat/fronted

9. After you finish your feature you must submit a merge request pointing to **dev** branch:
   > Note: You will specify the reviewers that will approve this merge.


## License
[MIT](https://choosealicense.com/licenses/mit/)