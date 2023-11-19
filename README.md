# Frontmatter Update Plugin for Obsidian

This Obsidian plugin automatically updates the 'Статус' field in the frontmatter of the current note based on data fetched from an OpenProject API. The plugin uses a specified server address and API key, which can be configured in the plugin settings.

## Features

- Fetches data from a specified OpenProject API endpoint.
- Dynamically updates the 'Статус' field in the frontmatter of the opened note based on the API response.
- Configurable server address and API key through plugin settings.

## Installation

To install the plugin, follow these steps:

1. Download the latest release from the plugin's GitHub repository.
2. Extract the plugin folder into your Obsidian vault's `.obsidian/plugins` directory.
3. Reload Obsidian or restart the application.
4. Go to `Settings > Community Plugins` and make sure `Community Plugins` is enabled.
5. Find the `Frontmatter Update Plugin` in the list of available plugins and enable it.

## Usage

Upon opening a note, the plugin checks for an 'OpenProjectID' in the note's frontmatter. If found, it makes a request to the configured OpenProject API endpoint and updates the 'Статус' field in the frontmatter based on the response.

### Configuring Plugin Settings

To configure the plugin settings:

1. Open Obsidian Settings.
2. Navigate to `Plugin Options > Frontmatter Update Plugin`.
3. Enter the desired server address and API key in the provided fields.
4. The settings will be saved automatically.

## Settings

- **Server Address**: The address of the OpenProject server (e.g., `http://192.168.88.126`).
- **API Key**: The API key used for authentication with the OpenProject server.

## License

[Specify the license under which your plugin is distributed]

## Contributing

Contributions to the plugin are welcome. Please refer to the contributing guidelines in the GitHub repository for more information.

## Support

For support, questions, or feature requests, please open an issue in the GitHub repository.

## Acknowledgements

Thanks to the Obsidian community and contributors who make projects like this possible.
