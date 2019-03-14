---
layout: post
title: How to cope with a localization tool in action
date: 2018-12-18
header_image: public/localization-tool-action.jpeg
header_overlay: true
category: language-and-localization
tags: ["localization", "localization tool", "agile"]
authors: ["Christina"]
about_authors: ["cgebken"]
---

In this series of blog posts, you've accompanied us on our journey towards an improved localization process with the help of the localization tool [PhraseApp](https://phraseapp.com/){:target="_blank"}.
We've already talked about our [former localization flow](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/), and our learnings and improvements when [integrating PhraseApp](/blog/language-and-localization/rocking-the-stage-with-a-software-localization-tool/).
But now it's time to talk about challenges that we faced during this restructuring time, and in some regards are still facing.

## There's still no way around screenshots

PhraseApp offers great features such as Git-Synchronization, or In-Context Editor.
If you'd like to get more detailed information on these, check back on our post ["Rocking the stage with a software localization tool"](/blog/language-and-localization/rocking-the-stage-with-a-software-localization-tool/).
Nevertheless, some of these features are not the one and only solution for us.
This is especially true for the In-Context Editor.
We've put a lot of hope into it as we are firmly convinced that UI texts are always better if they are created with as many context information as possible.
But as our software includes optional fields and overlays, we cannot make use of the full range of the In-Context Editor for all our keys.
Keys that aren't directly visible on the page, e.g. because they are only displayed once you select a checkbox, still require screenshots as context for UI writers and translators.
Depending on the complexity of the feature, this can be quite some manual effort.

## Introducing l10n branch

Implementing a new localization tool in a software company like [ePages](https://epages.com/en/){:target="_blank"}, is of course closely related to the cooperation with the developers.
The Git Synchronization already helped a lot to improve this cooperation.
But nevertheless, coming up with a fitting Git workflow for the localization process was one of our biggest challenges.
(To all the non-developers that have never worked with Git or GitHub before, just forward this section to a developer colleague 😉.
They will know what to do, and it will make your life easier!)

After setting up the Git Synchronization, we figured out that our current Git workflow no longer matched our requirements, and that we needed to make some changes.
Our solution was to introduce a branch called `l10n`.
This branch is exclusively used for PRs with code changes that somehow affect localization, e.g. PRs with newly added keys.
In order to enable our UI writers to edit these keys, PhraseApp is also connected to the `l10n` branch.
All other code changes will use our `master` branch, which is regularly rolled out to our live platforms serving our merchants and their customers.
This way, no untranslated keys will be visible in our UI, and code changes that are not related to localization are not blocked.

To keep both branches up-to-date, the `l10n` branch is regularly merged into `master` as soon as all keys are translated that the `l10n` branch contains.
What's more, the `master` branch is regularly merged into `l10n`, so that the `l10n` branch also contains the code changes that did not affect localization.
This merge routine is necessary, as we have a staging system running on our `l10n` branch.
The staging system is used for the In-Context Editor.
Running on this system, the In-Context Editor can display the untranslated keys in the `l10n` branch while representing the current state of the software with all code changes (also the ones that are not related to localization).

### CODEOWNERS

Now we had this great new branch.
But this didn't solve all our challenges.
We still needed to ensure that PRs are merged at the right time.
Meaning that a new PR could only be merged into the `l10n` branch, if

- no UI texts are currently in the making,
- no UI texts are about to be done,
- the `l10n` branch doesn't contain translated keys that are not yet merged into the `master` branch.

Otherwise, it could occur that our UI writers just provided new translations, but we can't merge them back into `l10n`, and afterwards directly to `master` because the `l10n` branch contains untranslated keys.

To solve this issue, we made use of the GitHub feature [CODEOWNERS](https://help.github.com/articles/about-codeowners/){:target="_blank"}.
With this feature you can determine that certain parts of the code or files belong to a specific GitHub user.
In our case, we determined that all files containing translation keys belong to our Localization Manager.
This made it obligatory that a PR touching these files gets an approved review from our Localization Manager before it can be merged.

We can now use the review functionality of a PR as a communication channel between Localization Manager and developers.
As long as a PR is approved, it can be merged at any time.
But if merging is currently not possible, the approval will be withdrawn until it's possible again.

### Overview? Definitely needed!

The requirement to approve PRs brought up a new challenge, as we needed to keep an overview of the PRs against the `l10n` branch.
How many PRs are currently open?
How many of them are already approved?
And how does this fit to the translation scheduling of our UI writers?

We needed to come up with a plan.
Literally.
In our intranet, we've created an overview of approved PRs:

{% image_custom image="/assets/img/pages/blog/images/overview-of-approved-prs.png" width="100" lightbox %}

Here's a little explanation for the column titles:

- **PR**: Contains a short but meaningful name for the PR so that you know what this PR is about and which keys it includes.
- **Approved**: Receives a checkmark once the Localization Manager has approved the PR.
- **Merged**: Receives a checkmark once the PR was merged into the `l10n` branch by the development team.
- **Translation date**: Contains the date the keys will be processed by the UI writers.
- **Merged back**: Receives a checkmark once the PR of PhraseApp with new translations was merged back into the `l10n` branch by the development team.
- **Comment**: Contains comments if needed, e.g. a reminder that keys in PhraseApp need to be deleted once the PR is merged.

With the help of this list, it's much easier to keep an overview of localization-related PRs and their approvals.

## The effort was worth it!

It's now almost one year ago that we introduced PhraseApp.
That's why we lately had a localization retrospective with our UI writers, developers, the responsible Product Owner, and our Localization Manager.
And...we are happy!
Even though, there are still some challenges that pop up every now and then.
But we are able to cope with them.
We can enjoy so many advantages that we never would have dreamt of two years ago.
Putting our localization process under the microscope, and being willing and brave enough to make big changes totally paid off for us.

Some of our solutions might not totally fit to the requirements and workflows that you might be facing.
But that's okay.
You will find your own ways to improve your localization process.
Just give it a try!

## Related posts

* [Why the heck would we need a software localization tool?](/blog/language-and-localization/why-the-heck-would-we-need-a-software-localization-tool/)
* [Rocking the stage with a software localization tool](/blog/language-and-localization/rocking-the-stage-with-a-software-localization-tool/)
