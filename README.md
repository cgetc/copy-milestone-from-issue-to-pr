# copy-milestone-from-issue-to-pr

This action copy a milestone to pull request from a issue number written its body.

## Inputs

## `GITHUB_TOKEN`

**Required** Github Token。

## Outputs

## `milestoneNumber`

The milestone number that the action set.

## `milestoneTitle`

The milestone title that the action set.

## Example

uses: cgetc/copy-milestone-from-issue-to-pr@v0.1.0
with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
