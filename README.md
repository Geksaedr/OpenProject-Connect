# OpenProject-Connect plugin for Obsidian

OpenProject-Connect is an Obsidian plugin designed to seamlessly sync the status of a work package from [OpenProject](https://www.openproject.org/) into your Obsidian notes. It allows you to link a specific OpenProject work package to a note via a unique ID and automatically updates a specified property field with the current status of this work package.

## Features

- **Work Package Status Sync**: Automatically updates the status of a linked OpenProject work package in the note's properties.
- **Customizable Frontmatter Fields**: Configurable properies fields for both the OpenProject ID and the status property.
- **Per-Note Configuration**: Supports a unique OpenProject work package ID per note for targeted updates.

## Installation

To install the plugin:

1. Download the latest release from the GitHub repository.
2. Unzip the files into your Obsidian vault's `.obsidian/plugins` directory.
3. In Obsidian, go to `Settings` -> `Community Plugins` and make sure `Safe Mode` is off.
4. Find the OpenProject-Connect plugin in the list of community plugins and enable it.

## Usage

To use the plugin:

1. Open the note you want to link with an OpenProject work package.
2. Ensure the note's properties contains the field designated for the OpenProject ID (customizable in settings).
3. The plugin will automatically fetch the current status of the work package and update the specified status field in the proprties upon opening the note.

## Configuration

Configure the plugin via the settings tab in Obsidian:

- **Server Address**: Set the URL of your OpenProject server (e.g., `http://10.10.30.10`).
- **API Key**: Enter your OpenProject API key.
- **OpenProject ID Field**: Specify the frontmatter field name that contains the OpenProject work package ID.
- **Status Field**: Define the frontmatter field name where the work package status will be updated.


## OpenProject Configuration

To allow propper comunication you need to enable Cross-Origin Resource Sharing (CORS) in OpenProject:

- In administrators panel go to the API settings.
- Enable CORS.
- Add `app://obsidian.md` to the allowed origins and save changes.

## Limitations

- The plugin currently supports one OpenProject work package ID per note.
- Real-time syncing is triggered when a note is opened.

## Support

For support, questions, or feature requests, please open an issue in the GitHub repository.

## Acknowledgements

Thanks to the Obsidian community and contributors who make projects like this possible.

---

This plugin is not affiliated with, directly maintained by, or endorsed by the developers of Obsidian or OpenProject.

