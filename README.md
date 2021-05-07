# Discord Webhook Integration for YouTrack
YouTrack currently has no decent way of sending webhook notifications to Discord as of right now, so this project solves just that.

## Installation
1. Create a new workflow on YouTrack, name it something like `discord-webhook` or whatever.
2. In the YouTrack workflow scripting area that you're taken to, press the + button on your workflow and add a custom module for each JavaScript file in this project.
3. Paste and save the contents of each JavaScript file from this project into the custom modules.
4. Change the config file set up the integration.
5. Test if the integration works by creating a new issue on YouTrack.
