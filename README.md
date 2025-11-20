# Vibe DNA repo helper

This repository currently uses the `work` branch for in-progress changes. If you see GitHub refuse to open a pull request with a message like "Branch has no history in common with trunk" it usually means your local branch is not based on the current default branch.

## How to fix the "no history in common with trunk" error
1. Make sure you have the remote default branch (replace `origin` or `trunk` if your remote uses different names):
   ```bash
   git fetch origin trunk
   ```
2. Rebase your work branch onto the default branch to re-establish shared history:
   ```bash
   git checkout work
   git rebase origin/trunk
   ```
   Resolve any conflicts and continue the rebase if prompted.
3. Push the rebased branch (use `--force-with-lease` because the history was rewritten):
   ```bash
   git push --force-with-lease origin work
   ```
4. Open a new pull request with base set to `trunk` and compare set to `work`.

## Alternative: create a fresh branch from trunk
If rebasing is risky or messy, you can cherry-pick your latest commits onto a new branch created from the default branch:
```bash
git checkout trunk
git pull origin trunk
git checkout -b work-fixed
git cherry-pick <your_commit_sha>
git push origin work-fixed
```
Then open a PR from `work-fixed` to `trunk`.

## Notes
- The error happens when the compare branch and base branch were created from unrelated repository histories (e.g., after a force push on `trunk` or initializing the repo separately). Rebasing or recreating the branch from `trunk` restores a common ancestry so GitHub can compare the branches.
- After merging, update your local default branch regularly to avoid future divergence:
  ```bash
  git checkout trunk
  git pull origin trunk
  ```
