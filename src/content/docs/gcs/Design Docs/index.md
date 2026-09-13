---
title: How to use the Design Doc Template
description: Documentation for using and submitting a design doc. 

sidebar:
  order: 5
---

## Purpose

Design docs are standard a standard practice in industry.

**The purpose of a design doc is to:**
- Plan out your design
- Communicate your design effectively with other members
- Get feedback on your design from other members and leads
- Document the plan, caveats, alternatives, and noting the "why" behind decisions (longevity)

**BEFORE changing any code.**

These should be used to document large changes such as migrations, reorgs, refactors, new features, etc. 

For smaller changes, you may do a mini version of a design doc or leave it up to the discretion of your subteam's lead for how to proceed. 

## Creating your design doc
1. Follow the [How to Contribute](/gcs/documentation/#how-to-contribute) Guide
2. Make a copy of `/src/content/docs/gcs/Design Docs/DesignDocTemplate.md` and place it into the correct directory for your subteam under `/src/content/docs/gcs/Design Docs`
3. If you'd like to embed interactive elements, change the extension from `.md` to `.mdx`
4. Title it `[Your short title here] Design Doc`
5. Remove `sidebar: order: 5` from the template to prevent messing up the sidebar
6. Fill out the subheadings as needed. You may remove, add, or modify any section of the template to fit your needs

## Submitting your design doc
1. Create a Pull Request (PR) for your design doc's branch on the [documentation repo](https://github.com/ngcp-project/ngcp-project.github.io)
2. Update the `PR Link` section with the link to this PR
3. Add the appropriate reviewers to your PR (Subteam leads & other relevant members)
4. Ping them on discord to let them know they've been added as a reviewer
5. Make changes based on the feedback from reviewers
6. Once approved, you may merge the PR into main and begin coding your solution