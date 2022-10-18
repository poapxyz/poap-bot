# @POAP-Bot: Automated Claim Code distribution for POAP events via Discord

## READ ME FIRST ⚠️
There are improved versions of this bot that provide additional security and better UX. Please check [POAP.Directory](https://poap.directory/en/integrations/discord) for the latest version. If you are unsure how to proceed, please review recommendations for quality drops in the [POAP Issuer Guidelines](https://curation.poap.xyz/guidelines/policy-and-process/poap-issuer-guidelines#guidelines).


## Prerequisites
The POAP-Bot is open for any and all to use to help automate the distribution of POAP Claim Codes during a live event for use on a Discord Server. You will need the following in order to Install & Configure the POAP-Bot:

- Admin Rights To A Discord Server
- Direct Messages From Server Members Enabled
- A Valid POAP Event With Claim Codes
- Event Details (Start/End Times, Codeword)

## How To Install The POAP-Bot On A Discord Server
The POAP-Bot can be installed on any Discord Server and used to automatically distribute POAP claim codes for a live POAP Event. To be able to install the POAP-Bot you will need to have administrator rights or be the server owner in order to install and configure the bot. 


### Installation Instructions
1. **Add the POAP-Bot to your Discord Server** by [clicking this link.](https://discord.com/api/oauth2/authorize?client_id=764554729476194315&permissions=2112&scope=bot)
<br/>

![Install POAP Bot to Discord](./doc/poap-bot-install.gif)

`NOTE: The link will open to discord.com in a browser page. Once you sign in (which may happen automatically if credentials have been cached) you can select the server you want the POAP-Bot to be installed on. Approve permissions needed for the POAP-Bot to function, and the bot will appear as a new member of the server as POAP-bot#0094.`

2. **Update/Verify your User Settings.** This is needed to ensure the POAP-Bot Wizard can message you during setup. To Update/Verify your User Settings go to: **User Settings > Privacy & Safety > Allow direct messages from server members** on your Discord Server. 

Example of proper settings :
![Discord User Settings](https://ethstaker.cc/wp-content/uploads/2021/06/Screenshot-from-2021-06-21-15-12-43.png)

## How To Configure the POAP-Bot For A POAP Event
Once the POAP-Bot has been installed to your Discord Server you can now configure it to automatically distribute POAP Claim Codes on your server. In order to configure the POAP-Bot you will need to supply the following information:
- Public Notification Channel on Discord
- Start/End Date & Time of Event
- Public Confirmation Message
- Codeword
- Valid POAP Claim Codes in a .txt file


The POAP-Bot has one main commands: **`!setup`**. Instructions on how to use this command is listed below. 
<br/>
- **`!setup`** This is command is used to initially configure the POAP-Bot for a POAP Distribution.


### Configuring The POAP-Bot For An Event #setup-bot

1. Call the POAP-Bot by **_mentioning_** it with the command: **`!setup`**
![Calling The POAP-Bot](./doc/poap-wizard.gif)
2. After calling **`!setup`** The POAP-Bot will initiate a Wizard via Direct Message, follow the instructions based on the Wizard. A few items to note when going through the wizard:
    - **Public Notification channel:** You can choose any channel on your Discord Server to use as a Notification Channel. The POAP-Bot uses this channel to announce when the POAP Claim Window has started and ended. You can use the **`[-]`** command to use the POAP-Bot defaults. 
    - **Start/End Date & Time:** This is the time period that the bot will accept codewords to distribute claim codes on your Discord Server. This can be as short as a few minutes or as long as a few weeks. Once the End Date/Time has been reached the POAP-Bot will stop distributing claim codes, _even if there are valid claim codes remaining._**The POAP-Bot uses Central European Summer Time GMT+0200.**
    - **POAP-Bot Response Message:** When someone _Directly Messages_ the POAP-Bot with the correct codeword to claim a POAP, this will be the message the user will see. You can modify this message to whatever you need in order to tailor it to your specific event. **Be sure to include the `{code}` syntax or the POAP-Bot will not successfully distribute the POAP Claim Codes.** To accept the default message use the _dash_ **`[-]`** command.
    - **Codeword:** In order to claim a POAP somone needs to _Directly Message_ the POAP-Bot the "codeword". This is any arbritary word. Please note that the codeword needs to be a single word or phrase with no spaces or hyphens. 
        - Valid Codeword Example: `validcodeword`
        - Invalid Codeword Example: `Invalid codeword` or `Invalid-Codeword`
    - **Claim Code File Upload:** The last step to configure the POAP-Bot is to upload the valid claim codes for the POAP-Bot Wizard to distribute. These should be in a .txt file and would have been provided to you after creating your POAP Event and requesting Claim Codes [from the POAP Discord.](https://discord.gg/9s8U8Bn) 


## Troubleshooting The POAP-Bot
There are times when attempting to interact with the POAP-Bot you'll recieve an error message. Each emoji (error) means something different:
- ❌ = The codeword provided is not valid _or_ The POAP Event has expired
    - If you recieve this error when attempting to claim a POAP, ensure you have typed/spelled the codeword correctly. If you're sure it's correct, verify that the POAP event hasn't ended by checking the **End Date** on [POAP.Gallery](poap.gallery/)
- 🤔 = The POAP-Bot has run out of Claim Codes
    - If you recieve this error when attempting to claim a POAP the POAP-Bot has run out of Claim Codes to distribute. If you are the Event Organizer you can request additional Claim Codes and request they be uploaded by contacting the POAP Team via Discord. 
