
/**
 * Represents an Embed in a Discord webhook message.
 */
export class Embed {
    /**
     * @constructor
     * @param {Author} [author]
     * @param {Body} [body]
     * @param {Field[]} [fields=[]] An array of fields.
     * @param {string} [imageUrl] An image to show on the Embed.
     * @param {string} [thumbnailUrl] A URL pointing to a thumbnail image.
     * @param {Footer} [footer]
     */
	constructor(author, body, fields, imageUrl, thumbnailUrl, footer) {
        this.#author = author;
        this.#body = body;
        if (fields) this.#fields = fields;
        this.#imageUrl = imageUrl;
        this.#thumbnailUrl = thumbnailUrl;
        this.#footer = footer;
	}

    /**
     * @param {Author} author
     */
    set author(author) {this.#author = author}

    /**
     * @param {string} body
     */
    set body(body) {this.#body = body}

    /**
     * @param {Fields[]} fields
     */
    set fields(fields) {this.#fields = fields}

    /**
     * @param {string} imageUrl
     */
    set imageUrl(imageUrl) {this.#imageUrl = imageUrl}

    /**
     * @param {string} thumbnailUrl
     */
    set thumbnailUrl(thumbnailUrl) {this.#thumbnailUrl = thumbnailUrl}

    /**
     * @param {Footer} footer
     */
    set footer(footer) {this.#footer = footer}

    /**
     * @param {Field} field The field to add to the Embed fields array. 
     */
    addField(field) {
        this.#fields.push(field);
    }

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {string} Embed as a JSON object.
     */
     toJSON() {
        let obj = this.#body ? this.#body.getJSONObject() : {};

        obj.author = this.#author;
        obj.fields = this.#fields;
        if (this.#imageUrl) obj.image = {url: this.#imageUrl}; //What on earth Discord?
        if (this.#thumbnailUrl) obj.thumbnail = {url: this.#thumbnailUrl};
        obj.footer = this.#footer;

        return obj;
    }

    #fields = [];
}

/**
 * Represents the Body of an Embed in a Discord webhook message.
 */
export class Body {
    /**
     * @constructor
     * @param {string} [title] The title of the embed.
     * @param {string} [description] A description shown below the title.
     * @param {string} [url] URL of the embed title.
     * @param {string} [color=FFFFFF] The colour of the embed as a hexadecimal colour value (omit the #).
     * @param {string} [timestamp] A timestamp to show on the footer.
     */
    constructor(title, description, url, color, timestamp) {
        this.#title = title;
        this.#description = description;
        this.#url = url;
        if (color) this.#color = color;
        this.#timestamp = timestamp;
    }

    /**
     * @param {string} title
     */
    set title(title) {this.#title = title}

    /**
     * @param {string} description
     */
    set description(description) {this.#description = description}

    /**
     * @param {string} url
     */
    set url(url) {this.#url = url}

    /**
     * @param {string} color The colour of the embed as a hexadecimal colour value (omit the #).
     */
    set color(color) {this.#color = color}

    /**
     * @returns {number} The embed colour in decimal.
     */
    get color() {
        return parseInt(this.#color, 16)
    }

    /**
     * @param {string} timestamp
     */
    set timestamp(timestamp) {this.#timestamp = timestamp}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {Object} Body as a JSON object.
     */
    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            url: this.#url,
            color: this.color,
            timestamp: this.timestamp
        };
    }

    #color = "FFFFFF";
}

/**
 * Represents the Author of an Embed in a Discord webhook message.
 */
export class Author {
    /**
     * @constructor
     * @param {string} name The name of the Author.
     * @param {string} [url] URL of the Author's name.
     * @param {string} [iconUrl] The icon URL of the Author.
     */
	constructor(name, url, iconUrl) {
        this.#name = name;
        this.#url = url;
        this.#iconUrl = iconUrl;
	}

    /**
     * @param {string} name
     */
    set name(name) {this.#name = name}

    /**
     * @param {string} url
     */
    set url(url) {this.#url = url}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(iconUrl) {this.#iconUrl = iconUrl}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {string} Author as a JSON string.
     */
    toJSON() {
        return {
            name: this.#name,
            url: this.#url,
            icon_url: this.#iconUrl
        };
    }
}

/**
 * Represents a Field of an Embed in a Discord webhook message.
 */
export class Field {
    /**
     * @constructor
     * @param {string} name The name of the field.
     * @param {string} description The description below the field title.
     * @param {string} [isInline] Should the field be displayed inline.
     */
    constructor(name, description, isInline) {
        this.#name = name;
        this.#description = description;
        this.#isInline = isInline;
    }

    /**
     * @param {string} name
     */
    set name(name) {this.#name = name}

    /**
     * @param {string} description
     */
    set description(description) {this.#description = description}

    /**
     * @param {string} isInline
     */
    set isInline(isInline) {this.#isInline = isInline}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {string} Field as a JSON object.
     */
    toJSON() {
        return {
            name: this.#name,
            value: this.#description,
            inline: this.#isInline
        };
    }
}

/**
 * Represents the Footer of an Embed in a Discord webhook message.
 */
export class Footer {
    /**
     * @constructor
     * @param {string} [text] The text shown on the footer.
     * @param {string} [iconUrl] An icon to show on the footer.
     */
    constructor(text, iconUrl) {
        this.#text = text;
        this.#iconUrl = iconUrl;
    }

    /**
     * @param {string} text
     */
    set text(text) {this.#text = text}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(iconUrl) {this.#iconUrl = iconUrl}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {string} Footer as a JSON object.
     */
    toJSON() {
        return {
            text: this.#text,
            icon_url: this.#iconUrl,
        };
    }
}