
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/XXX";

/**
 * Represents an Payload sent by a Discord webhook.
 */
export class Payload {
    /**
     * @constructor
     * @param {string} [message] A message that will be put in chat by the webhook.
     * @param {string} [username] The username of the webhook sender.
     * @param {string} [avatarUrl] A URL pointing to an image to be used as the avatar.
     * @param {Embed[]} [embeds] An array of Embeds to send.
     */
	constructor(message, username, avatarUrl, embeds) {
		this.#message = message;
		this.#username = username;
		this.#avatarUrl = avatarUrl;
		if (embeds) this.#embeds = embeds;
	}

    /**
     * @param {string} message
     */
	set message(message) {this.#message = message}

	/**
	 * @param {string} username
	 */
	set username(username) {this.#username = username}

	/**
	 * @param {string} avatarUrl
	 */
	set avatarUrl(avatarUrl) {this.#avatarUrl = avatarUrl}

	/**
	 * @param {Embed[]} embeds
	 */
	set embeds(embeds) {this.#embeds = embeds}

    /**
	 * Adds an Embed to the webhook Payload.
     * @param {Embed} embed The embed to add.
     */
    addEmbed(embed) {
        this.#embeds.push(embed);
    }
	
    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {string} Payload as a JSON object.
     */
	toJSON() {
		return {
			content: this.#message,
			username: this.#username,
			avatar_url: this.#avatarUrl,
			embeds: this.#embeds
		};
	}

	/**
	 * Sends the payload to a Discord webhook URL
	 */
	send(webhookUrl) {
		let connection = new http.Connection(webhookUrl, null, 2000);
		connection.addHeader("Content-Type", "application/json");

		try {
			let response = connection.postSync("", null, JSON.stringify(this));
			if (!response.isSuccess) console.warn("Discord webhook payload failed to send.\n" + response.toString());
		}
		catch(exception) {
			console.error(exception);
		}
	}

	#embeds = [];
}