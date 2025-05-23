# Using Git and GitHub: A Basic Guide

This guide covers the fundamental Git commands and workflow for interacting with GitHub repositories.

## What are Git and GitHub?

*   **Git:** A distributed version control system (VCS) installed on your local machine. It tracks changes to your code, allowing you to revert to previous versions, collaborate with others, and manage different features (branches).
*   **GitHub:** A web-based hosting service for Git repositories. It provides a central place to store your code online, collaborate with others, manage projects, track issues, and more.

## Basic Workflow

1.  **Clone:** Get a copy of a remote repository (from GitHub) onto your local machine.
2.  **Modify:** Make changes to the files (edit code, add new files, etc.).
3.  **Stage:** Select the specific changes you want to include in your next commit.
4.  **Commit:** Save your staged changes to your local repository's history with a descriptive message.
5.  **Push:** Upload your local commits to the remote repository on GitHub, sharing them with others.
6.  **Pull:** Download changes made by others from the remote repository to your local machine, merging them with your work.

## Common Git Commands

Here are some essential Git commands and what they do:

**Setup (Run Once)**

*   `git config --global user.name "Your Name"`
    *   Sets the name that will be associated with your commits globally (for all repositories).
*   `git config --global user.email "your.email@example.com"`
    *   Sets the email address that will be associated with your commits globally.
*   `git config --global pull.rebase false`
    *   Sets the default pull strategy to 'merge' (recommended for beginners).

**Getting a Repository**

*   `git clone <repository_url>`
    *   Downloads a repository from a URL (e.g., from GitHub) to your local machine. Creates a new directory for the project.
*   `git init`
    *   Initializes a new, empty Git repository in the current directory. Use this when starting a project from scratch locally.

**Checking Status**

*   `git status`
    *   Shows the current state of your working directory and staging area. Displays which files are modified, staged, or untracked.

**Making Changes**

*   `git add <file_name>`
    *   Stages a specific file, preparing it to be included in the next commit.
*   `git add .`
    *   Stages all modified and new (untracked) files in the current directory and subdirectories.
*   `git commit -m "Your descriptive commit message"`
    *   Records the staged changes to the local repository's history. The message should briefly explain *what* changes were made.
*   `git reset <file_name>`
    *   Unstages a file, removing it from the staging area but keeping the modifications in your working directory.
*   `git checkout -- <file_name>`
    *   **Warning:** Discards unstaged changes made to a specific file since the last commit, restoring it to its last committed state.

**Connecting to Remote Repositories**

*   `git remote -v`
    *   Lists the remote repositories configured for your local repository (usually just 'origin').
*   `git remote add origin <repository_url>`
    *   Adds a new remote repository connection (typically named 'origin') using the provided URL. Used after `git init`.

**Syncing with Remote Repositories**

*   `git push origin <branch_name>`
    *   Uploads your local commits from the specified branch (e.g., `main` or `master`) to the remote repository ('origin').
*   `git pull origin <branch_name>`
    *   Downloads changes from the specified remote branch and merges them into your current local branch. Equivalent to `git fetch` followed by `git merge`.
*   `git fetch origin`
    *   Downloads changes and commit history from the remote repository ('origin') but *does not* merge them into your local branches. Useful for seeing what others have done without immediately integrating it.

**Branching**

*   `git branch`
    *   Lists all local branches. The current branch is marked with an asterisk (*).
*   `git branch <new_branch_name>`
    *   Creates a new branch based on your current commit history.
*   `git checkout <branch_name>`
    *   Switches your working directory to the specified branch.
*   `git checkout -b <new_branch_name>`
    *   Creates a new branch *and* immediately switches to it.
*   `git merge <branch_name>`
    *   Combines the history of the specified branch into your current branch.
*   `git branch -d <branch_name>`
    *   Deletes a local branch (only if it has been merged). Use `-D` to force delete an unmerged branch.

**Viewing History**

*   `git log`
    *   Shows the commit history for the current branch. Press 'q' to exit.
*   `git log --oneline --graph --decorate`
    *   A more concise and visual representation of the commit history.

This covers the basics. Git is powerful and has many more features, but these commands are the foundation for most daily development workflows with GitHub.
