---
title: Infrastructure Reorg Segment
description: Infrastructure specific notes on the GCS reorganization
---


**Author(s):** Kayshawn Williams

**Related Teams:** 

**PR Link:** The link to the PR for this design doc

## Background
The GCS Desktop Repo is unorganized. It is unclear what files every subteam is working on, old folders/files that should be deleted, etc. 
Infrastructure will need to be incorporated in the new organization

## Solution
Infrastructure currently resides in it's own repository, that is utilized by Software Integration. The currrent implementation means it runs as a seperate application from the main gcs. The infrastructure code should be moved to the main repo where it will be functionally part of the main application.

## Design/Implementation
Infrastrucutre is designed as a standalone library that can be utilized for hardware interfacing with the xbees. As such, the code should be able to be ported as is. The main difficulty will be in organizing Software Integration's new pathways to the Infrastrure libraries.

