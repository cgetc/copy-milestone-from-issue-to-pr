const core = require('@actions/core')
const github = require('@actions/github')

async function run(octokit, context) {
    const { pull_request } = context.payload
    const matches = pull_request.body.match(/#(\d+)/)
    if (!matches || matches.length <= 1) {
        throw new Error('This PR has no related issue!')
    }
    const related_issue_number = matches[1]
    const { owner, repo } = context.repo

    const res = await octokit.rest.issues.get({
        issue_number: related_issue_number,
        owner,
        repo,
    })
    const issue = res.data
    if (!issue.milestone) {
        throw new Error('Related Issue has no milestone!')
    }
    if (issue.milestone.state !== 'open') {
        throw new Error('The milestone is not open!')
    }

    return octokit.rest.issues.update({
        milestone: issue.milestone.number,
        issue_number: pull_request.number,
        owner,
        repo,
    })
}

async function main () {
    try {
        const octokit = github.getOctokit(core.getInput('github-token'))
        const { data: { milestone } } = await run(octokit, github.context)
        core.setOutput('milestoneNumber', milestone.number)
        core.setOutput('milestoneTitle', milestone.title)
    } catch (error) {
        core.setFailed(error.message)
    }
}
main()
