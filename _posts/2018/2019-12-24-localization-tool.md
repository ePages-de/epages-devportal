---
layout: post
title: Localization tool in action - challenges and chances 
date: 2018-12-24
header_image: public/localization-tool-challenges.jpeg
header_overlay: true
category: language-and-localization
tags: ["localization", "localization tool", "agile"]
authors: ["Christina"]
about_authors: ["cgebken"]
---

In the last two posts of this series, you've accompanied us on our journey towards an improved localization process with the help of the localization tool [PhraseApp](https://phraseapp.com/){:target="_blank"}.
We've already talked about our [former localization flow](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/), and our learnings and improvements when [integrating PhraseApp](/blog/language-and-localization/rocking-the-stage-with-a-software-localization-tool/).
But now it's time to talk about challenges that we faced during this restructuring time and in some regards still do.

## Find workarounds

PhraseApp offers great features such as the Git-Synchronization, or the In-Context Editor.
But especially the Editor is not the one and only solution for us.
We'd love to have a link next to each key that can be clicked and leads directly to the respective key in the software UI.
This is possible for many keys, but not for the ones that aren't directly visible on the page.
This means, that they open in an overlay, or are only displayed once you select a button or a checkbox.
These keys are editable in the Editor, but they cannot be found via the link next to the key.

As our UI writers and our translation agency have limited time, they cannot search for each of this "hidden" keys in the UI.
That's why we still need to make screenshots for these keys which can be found next to the key instead of the link.
Depending on the complexity of your UI, this can be quite some manual effort.

## Adapt workflows

Implementing a new localization tool in a software company like [ePages](https://epages.com/en/){:target="_blank"}, is of course also related to the cooperation with the developers.
The Git Synchronization already helped a lot. 
But nevertheless, coming up with a fitting Git workflow for the new localization process was one of our biggest challenges.
(To all the non-developers that have never worked with Git or GitHub before, just forward this section to your favorite developer 😉.
They will know what to do and it will make your life easier!)

Before we came up with the new localization process, we worked with the typical Git workflow.
Meaning that we had a `master` and a `develop` branch.
This separation had a downside that we haven't been aware of:

Everything that has been merged into `develop` was seen as "ready to be merged into `master`".
But the Git Synchronization was also connected to the `develop` branch.
This connection was necessary as the translations need to be done BEFORE the related keys can be seen by our merchants, thus, before they are merged into `master`.
So, PRs with keys that need to be translated had to be merged into `develop` in order to be displayed in our localization tool.
But being merged into `develop`, they have been part of the heterogeneous mass of code changes that could be merged into `master` at any time.
This ended up in untranslated keys seen as "ready to be merged into `master`" and a huge communication and timing issue.

Our solution was a new branch called `l10n`.
PRs with code changes that somehow affect localization, e.g. PRs with newly added keys, now use this branch.
This way, no untranslated key will be visiible to our merchants and code changes that are not related to localization are not blocked.
At the same time, the keys for needed UI texts were displayed in our localization tool and can be edited.

The updated `l10n` branch is automatically merged into `master` once there is a new PR (with new translations) from PhraseApp.
Afterwards, the `master` branch is merged back into `l10n` to keep the `l10n` always up-to-date.

### Improve timing

So, now we had this great new branch.
But this didn't solve all our challenges.
We still needed to ensure that PRs are merged at the right time.
Meaning that a new PR could only be merged into the `l10n` branch, if 

- no UI text session is currently going on or is about to start.
- no PR from PhraseApp with new translations is waiting to be merged into `l10n`.

Otherwise, it could occur that our UI writers just finished a session and provided translations, but we can't merge them back into `l10n` and afterwards directly to `master` because the `l10n` branch contains untranslated keys.

That's why we made it obligatory that a PR needs an approved review from our Localization Manager before it can be merged into `l10n`.
As long as a PR is approved, it can be merged.
But if e.g. a UI text session is about to start, the approval will be withdrawed until the translations are merged back.

### Keep an overview

The need to approve PRs brought up a new challenge as we needed to keep an overview of the PRs against l10n.
How many PRs are currently open?
How many of them are already approved?
And how does this fit to the UI text session our UI writers have?

We needed to come up with a plan.
Literally.
In our intranet, we've created an overview of approved PRs:

{% image_custom image="/assets/img/pages/blog/images/overview-of-approved-prs.png" width="100" lightbox %}

Here's a little explanation for the column titles:

- **PR**: A short but meaningful name for the PR so that you know what this PR is about and which keys it includes.
- **Approved**: Add a tick once you have approved the PR.
- **Merged**: Add a tick when the PR was merged into the `l10n` branch by the delopment team.
- **Translation date**: The date the keys will be processed by the UI writers. 
- **Merged back**: Add a tick once the PR of PhraseApp with new translations was merged back into the `l10n` branch by the development team.
- **Comment**: Add comments if needed, e.g. a reminder that you need to delete keys in PhraseApp once the PR is merged.

With the help of this list, it's much easier to keep an overview of localization-related PRs and their approvals.

## Never stop improving!

It's now almost one year ago that we introduced PhraseApp.
That's why we lately had a little localization retro with our UI writers, developers, the responsible Product owner, and our Localization Manager.
And...we are happy!
Even though, there are still some challenges that pop up every now and then, we are able to cope with them.
And we can enjoy so many advantages that we wouldn't have dreamt of two years ago.
Putting our localization process under the microscope, and being willing and brave enough to make big changes totally paid off for us.
Give it a try!

## Related posts

* [Why the heck would we need a software localization tool?](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/)
* [Rocking the stage with a software localization tool](/blog/language-and-localization/rocking-the-stage-with-a-software-localization-tool/)