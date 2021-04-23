
const DEFAULT_EMBED_COLOR = "FFFFFF";

/**
 * Represents an Embed in a Discord webhook message.
 */
export class Embed {
    /**
     * @constructor
     * @param {Author} [author]
     * @param {Body} [body]
     * @param {Field[]} [fields=[]] - An array of fields.
     * @param {string[]} [imageUrls=[]] - An array of image URLs to show on the Embed.
     * @param {string} [thumbnailUrl] - A URL pointing to a thumbnail image.
     * @param {Footer} [footer]
     */
	constructor(author, body, fields, imageUrls, thumbnailUrl, footer) {
        this.#author = author;
        this.#body = body;
        this.#fields = fields;
        this.#imageUrls = imageUrls;
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
     * @param {string} imageUrls
     */
    set imageUrls(imageUrls) {this.#imageUrls = imageUrls}

    /**
     * @param {string} thumbnailUrl
     */
    set thumbnailUrl(thumbnailUrl) {this.#thumbnailUrl = thumbnailUrl}

    /**
     * @param {Footer} footer
     */
    set footer(footer) {this.#footer = footer}

    /**
     * @param {Field} field - The field to add to the Embed fields array. 
     */
    addField(field) {
        this.#fields.push(field);
    }

    /**
     * @param {string} imageUrl - The image URL to add to the Embed images.
     */
    addImageUrl(imageUrl) {
        this.#imageUrls.push(imageUrl);
    }

    #fields = [];
    #imageUrls = [];
}

/**
 * Represents the Author of an Embed in a Discord webhook message.
 */
export class Author {
    /**
     * @constructor
     * @param {string} name - The name of the Author.
     * @param {string} [url] - URL of the Author's name.
     * @param {string} [iconUrl] - The icon URL of the Author.
     */
	constructor(name, url, iconUrl) {
        this.#name = name;
        this.#url = url;
        this.#iconUrl = iconUrl;
	}

    /**
     * @param {string} name
     */
    set name(str) {this.#name = str}

    /**
     * @param {string} url
     */
    set url(str) {this.#url = str}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(str) {this.#iconUrl = str}
}

/**
 * Represents the Body of an Embed in a Discord webhook message.
 */
export class Body {
    /**
     * @constructor
     * @param {string} [title] - The title of the embed.
     * @param {string} [description] - A description shown below the title.
     * @param {string} [url] - URL of the embed title.
     * @param {string} [color=FFFFFF] - The colour of the embed as a hexadecimal colour value (omit the #).
     */
    constructor(title, description, url, color) {
        this.#title = title;
        this.#description = description;
        this.#url = url;

        if (!color) return;
        this.#color = color;
    }

    /**
     * @param {string} title
     */
    set title(str) {this.#title = str}

    /**
     * @param {string} description
     */
    set description(str) {this.#description = str}

    /**
     * @param {string} url
     */
    set url(str) {this.#url = str}

    /**
     * @param {string} color - The colour of the embed as a hexadecimal colour value (omit the #).
     */
    set color(str) {this.#color = str}
    
    #color = DEFAULT_EMBED_COLOR;
}

/**
 * Represents a Field of an Embed in a Discord webhook message.
 */
export class Field {
    /**
     * @constructor
     * @param {string} name - The name of the field.
     * @param {string} description - The description below the field title.
     * @param {string} [isInline] - Should the field be displayed inline.
     */
    constructor(name, description, isInline) {
        this.#name = name;
        this.#description = description;
        this.#isInline = isInline;
    }

    /**
     * @param {string} name
     */
    set name(str) {this.#name = str}

    /**
     * @param {string} description
     */
    set description(str) {this.#description = str}

    /**
     * @param {string} isInline
     */
    set isInline(str) {this.#isInline = str}
}

/**
 * Represents the Footer of an Embed in a Discord webhook message.
 */
export class Footer {
    /**
     * @constructor
     * @param {string} [text] - The text shown on the footer.
     * @param {string} [timestamp] - A timestamp to show on the footer.
     * @param {string} [iconUrl] - An icon to show on the footer.
     */
    constructor(text, timestamp, iconUrl) {
        this.#text = text;
        this.#timestamp = timestamp;
        this.#iconUrl = iconUrl;
    }

    /**
     * @param {string} text
     */
    set text(str) {this.#text = str}

    /**
     * @param {string} timestamp
     */
    set timestamp(str) {this.#timestamp = str}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(str) {this.#iconUrl = str}
}