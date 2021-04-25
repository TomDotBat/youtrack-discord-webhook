
const entities = require("@jetbrains/youtrack-scripting-api/entities");

const CONFIG = require("./config");
const {Payload} = require("./payload");
const {Embed, Body, Author, Field, Footer} = require("./embed");

const EVENTS = [
    {
        title: "Stage Changed",
        newDescription: "Stage set to $newValue.",
        changeDescription: "Stage changed from $oldValue to $newValue.",
        issueKey: "Stage",
        nameKey: "name"
    },
    {
        title: "Assignee Changed",
        newDescription: "Assignee set to $newValue.",
        changeDescription: "Assignee changed from $oldValue to $newValue.",
        issueKey: "Assignee",
        nameKey: "visibleName"
    },
    {
        title: "Comment Added",
        newDescription: "$newValue",
        customCheck: function(issue) {
            return issue.comments.isChanged;
        },
        valueGetter: function(issue) {
            if (issue.comments.added.size < 1) return "lmao i can't code";
            return issue.comments.added.get(0).text;
        }
    },
    {
        title: "Priority Changed",
        newDescription: "The issue priority was set to $newValue.",
        changeDescription: "The issue priority was changed from $oldValue to $newValue.",
        issueKey: "Priority",
        nameKey: "name"
    }
];

exports.rule = entities.Issue.onChange({
    title: "Discord Webhook",
    guard: (ctx) => {
        return ctx.issue.isReported;
    },
    action: (ctx) => {
        const issue = ctx.issue;

        if (issue.becomesReported) {
            const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
            const embed = new Embed();
            const body = new Body();

            body.title = "Issue " + issue.id + " Created";
            body.description = issue.description;
            body.url = issue.url;
            body.color = CONFIG.COLOR_NEGATIVE;
            body.setDateToNow();
            embed.body = body;

            const user = ctx.currentUser;
            embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

            embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

            payload.addEmbed(embed);
            payload.send(CONFIG.WEBHOOK_URL);

            return;
        }
        else if (issue.becomesResolved) {
            const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
            const embed = new Embed();
            const body = new Body();

            body.title = "Issue " + issue.id + " Resolved";
            body.description = issue.description;
            body.url = issue.url;
            body.color = CONFIG.COLOR_POSITIVE;
            body.setDateToNow();
            embed.body = body;

            const user = ctx.currentUser;
            embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

            embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

            payload.addEmbed(embed);
            payload.send(CONFIG.WEBHOOK_URL);

            return;
        }
        
        let changes = [];
        for (let i = 0; i < EVENTS.length; i++) {
            const event = EVENTS[i];
            const issueKey = event.issueKey;
            if (!((issueKey && issue.fields[issueKey] && issue.isChanged(issueKey)) || (event.customCheck && event.customCheck(issue)))) continue;

            let oldValue;
            let newValue;

            if (issueKey) {
                oldValue = issue.oldValue(issueKey);
                newValue = issue.fields[issueKey];
            }

            if (event.valueGetter) newValue = event.valueGetter(issue);

            if (event.nameKey) {
                if (oldValue) oldValue = oldValue[event.nameKey];
                newValue = newValue[event.nameKey];
            }

            let description = oldValue ? event.changeDescription : event.newDescription;

            changes.push({
                title: event.title,
                description: description.replace("$oldValue", oldValue).replace("$newValue", newValue)
            });
        }

        const changeCount = changes.length;
        if (changeCount < 1) return;

        const payload = new Payload(null, CONFIG.SENDER_NAME, CONFIG.AVATAR_URL);
        const embed = new Embed();

        const body = new Body();
        
        if (changeCount === 1) {
            const change = changes[0];
            body.title = change.title + " In " + issue.id;
            body.description = change.description;
        }
        else {
            body.title = changeCount + " New Changes To " + issue.id;
            for (let i = 0; i < changes.length; i++) embed.addField(new Field(changes[i].title, changes[i].description, false));
        }

        body.url = issue.url;
        body.color = CONFIG.COLOR_REGULAR;
        body.setDateToNow();
        embed.body = body;

        const user = ctx.currentUser;
        embed.author = new Author(user.visibleName, CONFIG.YOUTRACK_URL + "/users/" + user.login);

        embed.footer = new Footer(CONFIG.SITE_NAME + " " + issue.project.name);

        payload.addEmbed(embed);
        payload.send(CONFIG.WEBHOOK_URL);
    }
});