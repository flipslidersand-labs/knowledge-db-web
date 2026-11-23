# Changelog

All notable changes to this project are documented in this file.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/)

> No version has been tagged yet. The entries below summarize the git history up to the first release.

---

## [Unreleased]

### Added
- Next.js frontend with a search UI.
- Static deployment to GitHub Pages.

### Security
- Next.js updated to 16.3.8 for an unauthenticated RCE advisory (#12).

### Fixed
- Deployment configuration consolidated on GitHub Pages (#7).
- Stats fetch moved into `useEffect` to satisfy the react-hooks lint rule (#9).
- CI: reusable workflow pins point at commits reachable from the qa-workflows default branch (#14).
