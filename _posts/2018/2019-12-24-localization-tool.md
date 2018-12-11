---
layout: post
title: Localization tool 
date: 2018-12-24
header_image: public/localization-tool-challenges.jpeg
header_overlay: true
category: language-and-localization
tags: ["localization", "localization tool", "agile"]
authors: ["Christina"]
about_authors: ["cgebken"]
---

Here it is.
The third and final part of our software localization series.
In the last posts, you've accompanied us on our journey towards an improved localization process with the help of a localization tool.
Now, nearly one year has passed and it's time for a recap.
Have we been able to tackle all our challenges?
Are we satisfied with our current workflow?
What learnings did we have?

Let's start with our challenges.
When we introduced PhraseApp as our localization tool, we could enjoy many advantages: 

- Speed up our translation process from 3 weeks to a maximum of 1 week
- Provide really great context for all our translation keys with the In-Context Editor
- Stick to a fix set of terms provided via the Glossary and the Translation Memory
- Cooperate in an easier and developer-friendly way with our developers - Thanks to the Git Synchronization

But implementing a new tool of course also leads to some challenges.

## Git Workflow

Implementing a new localization tool in a software company like ePages, is of course also related to the cooperation with the developers.
The Git Synchronisation already helped a lot. 
But nevertheless, coming up with a fitting Git workflow for the new localization process was one of our biggest challenges.
(To all the non-developers that have never worked with Git or GitHub before, just forward this section to your favorite developer 😉.
They will know what to do and it will make your life easier!)

Before we came up with the new localization process, we worked with the typical Git workflow.
Meaning that we had a `master` and a `develop` branch.
This separation had a downside that we haven't been aware of:

Everything that has been merged into `develop` was seen as "ready to be merged into `master`".
But the Git Synchronization was connected to the `develop` branch.
This connection was necessary as the translations need to be done BEFORE the related keys can be seen in production, thus, before they are merged into `master`.
So, PRs with keys that need to be translated had to be merged into `develop` in order to be displayed in our localization tool.
But being merged into `develop`, they have been part of the heterogeneous mass of code changes that could be merged into `master` at any time.
This ended up in untranslated keys seen as "ready to be merged into `master`" and a huge communication and timing issue.

Our solution was a new branch called `l10n`.
PRs with code changes that somehow affect localization, e.g. PRs with newly added keys, are against this `l10n` branch.
This way, no untranslated key will go live and code changes that are not related to localization are not blocked.
At the same time, the keys for needed UI texts were displayed in our localization tool without being visible to our merchants.
The updated `l10n` branch is automatically merged into `master` once there is a new PR (with new translations) from PhraseApp.
Afterwards, the `master` branch is merged back into `l10n` to keep the `l10n` also always up-to-date.

### Timing

So, now we had this great new branch.
But this didn't solve all our challenges.
We still needed to ensure that PRs are merged at the right time.
Meaning that a new PR could only be merged into the `l10n` branch, if 

- no UI text session is currently going on or is about to start.
- no PR from our localization tool with new translation tools is waiting to be merged into `l10n` and thus into `master`.

Otherwise, it could occur that our UI writers just finished a session and provided translations, but we can't merge them back into `l10n` and then directly to `master` because the `l10n` branch contains untranslated keys.
That's why we made it obligatory that a PR needs an approved review from our Localization Manager before it can be merged into `l10n`.
As long as a PR is approved, it can be merged.
But if e.g. a UI text session is about to start, the approval will be withdrawed until the translations are merged back.

### PR overview

The need to approve PRs brought up a new challenge as we needed to keep an overview of the PRs against l10n.
How many PRs are currently open?
How many of them are already approved?
And how does this fit to the UI text session our UI writers have?

We needed to come up with a plan.
Literally.
In our intranet, we've come up with an overview of approved PRs:

{% image_custom image="/assets/img/pages/blog/images/overview-of-approved-prs.png" width="100" lightbox %}

Here's a little explanation for the column titles:

- **PR**: A short but meaningful name for the PR so that you know what this PR is about and which keys it includes.
- **Approved**: Add a tick once you have approved the PR.
- **Merged**: Add a tick when the PR was merged by the delopment team.
- **Translation date**: The date the keys will be processed by the UI writers. 
- **Merged back**: Add a tick once the PR of the localization tool with new translations was merged back by the development team.
- **Comment**: Add comments if needed, e.g. a reminder that you need to delete keys in PhraseApp once the PR is merged.

With the help of this overview, it's much easier to keep an overview of localization related PRs and their approvals.

