// Import necessary classes from Obsidian
const { Plugin, Notice, PluginSettingTab, Setting } = require('obsidian');

// Define the settings class
class FrontmatterUpdatePluginSettings {
    serverAddress = 'http://10.10.10.10';
    apiKey = 'your api key';
    openProjectIDField = 'OpenProjectID'; // Default field name for OpenProject ID
    statusField = 'Status'; // Default field name for work package status
}

// Define the settings tab class
class FrontmatterUpdateSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'OpenProject connection settings' });

        containerEl.createEl('h3', { text: 'Server Address' });
        new Setting(containerEl)
            .setName('Server Address')
            .setDesc('Enter the server address.')
            .addText(text => text
                .setPlaceholder('Enter server address')
                .setValue(this.plugin.settings.serverAddress)
                .onChange(async (value) => {
                    this.plugin.settings.serverAddress = value;
                    await this.plugin.saveSettings();
                }));

        // API Key
        containerEl.createEl('h3', { text: 'API Key' });
        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Enter your API key.')
            .addText(text => text
                .setPlaceholder('Enter API key')
                .setValue(this.plugin.settings.apiKey)
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));


        containerEl.createEl('h2', { text: 'Note interaction settings' });
        containerEl.createEl('h3', { text: 'Property name with OpenProject ID' });
        new Setting(containerEl)
            .setName('OpenProject ID Field')
            .setDesc('Enter the property name for the OpenProject ID.')
            .addText(text => text
                .setValue(this.plugin.settings.openProjectIDField)
                .onChange(async (value) => {
                    this.plugin.settings.openProjectIDField = value;
                    await this.plugin.saveSettings();
                }));

        // Work Package Status Field Name
        containerEl.createEl('h3', { text: 'Property to hold work package status' });
        new Setting(containerEl)
            .setName('Status Field')
            .setDesc('Enter the property name for the work package status.')
            .addText(text => text
                .setValue(this.plugin.settings.statusField)
                .onChange(async (value) => {
                    this.plugin.settings.statusField = value;
                    await this.plugin.saveSettings();
                }));
    }
}

// Define the plugin class
class FrontmatterUpdatePlugin extends Plugin {
    settings = new FrontmatterUpdatePluginSettings();

    async onload() {
        await this.loadSettings();

        // Listen for the event when a file is opened
        this.registerEvent(
            this.app.workspace.on('file-open', (file) => this.updateFrontmatterFromAPI(file))
        );

        // Add settings tab
        this.addSettingTab(new FrontmatterUpdateSettingTab(this.app, this));
    }

    async updateFrontmatterFromAPI(file) {
        if (!file) return;  // No file, so nothing to do

        const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
        const openProjectIDField = this.settings.openProjectIDField;
        const openProjectID = frontmatter?.[openProjectIDField];
        if (!openProjectID) return;  // No OpenProjectID in frontmatter

        // Dynamically construct the URL using OpenProjectID from settings
        const url = `${this.settings.serverAddress}/api/v3/work_packages/${openProjectID}`;

        // Credentials for basic authorization
        const username = 'apikey';
        const password = this.settings.apiKey;
        const token = btoa(`${username}:${password}`);

        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Basic ${token}` }
            });
            if (!response.ok) throw new Error('Network response was not ok.');

            const data = await response.json();
            const statusName = data._embedded?.status?.name;
            if (!statusName) throw new Error('Status name not found');

            // Update the 'Статус' field in the frontmatter
            const statusField = this.settings.statusField;
            await this.updateFrontmatter(file, statusField, statusName);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateFrontmatter(file, key, value) {
        const fileContents = await this.app.vault.read(file);
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        let frontmatterMatch = fileContents.match(frontmatterRegex);

        if (frontmatterMatch) {
            let frontmatterText = frontmatterMatch[1];
            const frontmatterLineRegex = new RegExp(`^${key}:.*$`, 'm');
            if (frontmatterText.match(frontmatterLineRegex)) {
                // Replace existing key's value
                frontmatterText = frontmatterText.replace(frontmatterLineRegex, `${key}: ${value}`);
            } else {
                // Add new key-value pair
                frontmatterText += `\n${key}: ${value}`;
            }
            const updatedContents = fileContents.replace(frontmatterRegex, `---\n${frontmatterText}\n---`);
            await this.app.vault.modify(file, updatedContents);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, this.settings, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

// Export the plugin class
module.exports = FrontmatterUpdatePlugin;
