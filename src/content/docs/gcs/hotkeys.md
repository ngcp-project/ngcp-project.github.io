---
title: Useful Hotkeys
sidebar:
  order: 1
---

## General Hotkeys
### Selecting by Word
- **Windows/Linux**: `Ctrl + Shift + Left/Right Arrow`
- **Mac**: `Option + Shift + Left/Right Arrow`

### Deleting by Word
- **Windows/Linux**: `Ctrl + Backspace` (to delete left), `Ctrl + Delete` (to delete right)
- **Mac**: `Option + Backspace` (to delete left), `Option + Delete` (to delete right)



## VSCode Hotkeys (Applies to Leetcode Too)
### Commenting/Uncommenting Code (Code Agnostic / Language Independent)
- **Windows/Linux**: `Ctrl + /`
- **Mac**: `Cmd + /`

### Scope Selection (Expand Selection)
- **Windows/Linux**: `Ctrl + Alt + Right Arrow`
- **Mac**: `Cmd + Alt + Right Arrow`

### Multi-Cursor Selection
- **Windows/Linux**: `Ctrl + Alt + Down/Up Arrow`
- **Mac**: `Option + Cmd + Down/Up Arrow`

* Alternatively, you can hold `Alt` (Windows/Linux) or `Option` (Mac) and click at multiple locations to place multiple cursors.
* Another option is to select a word and then press `Ctrl + D` (Windows/Linux) or `Cmd + D` (Mac) to select the next occurrence of that word.

### Vertical Cursor (Column) Selection
- **Windows/Linux**: `Shift + Alt` and drag with mouse or use `Shift + Alt + Arrow Keys`
- **Mac**: `Option + Cmd` and drag with mouse or use `Option + Cmd + Arrow Keys`

### Move Line Up/Down
- **Windows/Linux**: `Alt + Up/Down Arrow`
- **Mac**: `Option + Up/Down Arrow`

### Duplicate Line
- **Windows/Linux**: `Shift + Alt + Down Arrow`
- **Mac**: `Option + Shift + Down Arrow`

### Closing Folders in Explorer Custom Hotkey
- Searching up for "collapse" in the Keyboard Shortcuts settings can help you find and customize this command further.
- Additionally, you can adjust the following setting in your `keybindings.json` file to close all folders in the Explorer view:
```json
{
  "key": "ctrl+k",
  "command": "workbench.files.action.collapseExplorerFolders",
  "when": "explorerViewletVisible && filesExplorerFocus"
}
```

