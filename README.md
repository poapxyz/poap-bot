# @POAP-Bot: Code distribution for POAPs events

## Using @POAP-bot during events

During active events, users only need to sent a DM to @POAP-bot

1. Obtain the 'Secret Code' during the LIVE event
2. Directly Message @POAP-bot with the 'Secret Code'
3. Your POAP claim link code will be sent as a reply from the @POAP-bot.

Example:
![POAP-bot example](https://res.cloudinary.com/dbiqkiypz/image/upload/v1604692202/Screen_Shot_2020-11-06_at_16.45.29_ylsa5z.png)

## Add @POAP-bot to your server.

You can add to you discord server the @POAP-bot with this link:
https://discord.com/api/oauth2/authorize?client_id=764554729476194315&permissions=2112&scope=bot

It will open the discord.com site in a browser page. Once the user signs in (which may happen automatically if credentials have been cached), they can select the guild in which the bot is to operate, and approve the bot's permissions in that guild.

The bot will appear as a new member of the server (check for __POAP-bot#0094__).

## Setting up new POAP Event

Administrators may issue a command to the bot by mentioning it in a text channel, then adding the command in the message. Example:

`@POAP-bot !setup`

Note that the _mention_ must be to the bot as a _member_ and the bot will respond in a direct message dialog with the requesting user. Depending on the Discord client, the bot's _member_ name may be offered alongside its icon in a selection list when beginning to type the bot's name.

- _!setup_ Will initiate a dialog to set up a POAP event. Use this to add or modify an event.

Some aspects of a POAP distribution event are customisable, specifically:

- set the #channel to announce the beginning of an event
- the messages privately by the bot during the event.
- the start and end times (in UTC +0 time zone, with the following format: 2020-08-18 13:00)
- a file containing POAP codes (_Questions?_ Ask here -> https://t.me/poapxyz)

The bot will offer a default value for each parameter.

### Example POAP Event

![POAP-bot example](https://res.cloudinary.com/dbiqkiypz/image/upload/v1604800813/Screen_Shot_2020-11-07_at_23.00.04_z3xulj.png)
