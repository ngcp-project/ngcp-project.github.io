---
title: General Resources
description: External resources useful for members of the NGCP project
sidebar:
  order: 1
---

## Version Control
### Pruning Branches (Deleting Old Merged in Branches)
```
git pull --prune
```
* This command deletes branches that have been deleted from the remote repository.

---
```
git branch -vv | grep ": gone" | awk '{print $1}' | xargs git branch -D
```
* This command deletes local branches that have already been merged and deleted from the remote repository.



### General Resources
* [GitHub Pull Requests in 100 Seconds](https://www.youtube.com/watch?v=8lGpZkjnkt4) `video`
* [Using Git in VS Code](https://www.youtube.com/watch?v=lYiE5lBS13E) `video`
* [An Intro to Git and GitHub for Beginners](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) `blog`
* [Git Commands Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) `PDF`
* [Common Conventions for Writing Commit Titles](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) `docs` `article`
* [More Conventions for Writing Commit Titles](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) `docs` `article`





## Docker
* [Docker Setup](../../archive-gcs/database-23-24/docker-setup/) `docs`


## Electronics Infrastructure
### Communications Layer
### Video Feed
### Ground Data Hub
#### Raspberry Pi
- [Build your own weather station](https://projects.raspberrypi.org/en/projects/build-your-own-weather-station) - tutorial of a more basic version of the Data Hub
- [Raspberry Pi Shell Scripting](https://medium.com/coinmonks/raspberry-pi-3-model-b-shell-scripting-door-monitor-b44944f82d87) - tutorial introduction to universal way to read/write data with GPIO pins on RPi's
- [GPIO Programming using `sysfs` Linux interface](https://www.ics.com/blog/gpio-programming-using-sysfs-interface) - language agnostic way to read/write from GPIO pins
 

## Vehicle Integration

## Database

## User Interface
### Tauri
**[https://github.com/ngcp-project/gcs-user-interface](https://github.com/ngcp-project/gcs-user-interface)**
- [Official documentation](https://tauri.app)
- [HTTP requests in Tauri](https://tauri.app/v1/api/js/http)
- [Emit and listen for custom made events in Tauri's Rust backend](https://tauri.app/v1/api/js/event)
- [Invoke custom made functions in Tauri](https://tauri.app/v1/api/js/tauri)