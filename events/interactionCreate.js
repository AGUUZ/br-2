const client = require("../index");
const { cooldown, check_dj, databasing } = require("../handlers/functions");
const { emoji } = require("../settings/config");
const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {});
    await databasing(interaction.guildId, interaction.user.id);
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd)
      return client.embed(
        interaction,
        `${emoji.ERROR} \`${interaction.commandName}\` Command Not Found`
      );

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (cmd) {
      // checking user perms
      let queue = client.distube.getQueue(interaction.guild.id);
      let voiceChannel = interaction.member.voice.channel;
      let botChannel = interaction.guild.members.me.voice.channel;
      let checkDJ = await check_dj(client, interaction.member, queue?.songs[0]);
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.resolve(cmd.userPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `You Don't Have Permission to Use \`${cmd.name}\` Command!!`
        );
      } else if (
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(cmd.botPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `I Don't Have Permission to Run \`${cmd.name}\` Command!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` You are On Cooldown , wait \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Seconds`
        );
      } else if (cmd.inVoiceChannel && !voiceChannel) {
        return client.embed(
          interaction,
          `${emoji.ERROR} You Need to Join Voice Channel`
        );
      } else if (
        cmd.inSameVoiceChannel &&
        botChannel &&
        !botChannel?.equals(voiceChannel)
      ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
        );
      } else if (cmd.Player && !queue) {
        return client.embed(interaction, `${emoji.ERROR} Music Not Playing`);
      } else if (cmd.djOnly && checkDJ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} You are not DJ and also you are not song requester..`
        );
      } else {
        cmd.run(client, interaction, args, queue);
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch((e) => {});
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  // button handling
  if (interaction.isButton()) {
    if (interaction.replied || interaction.deferred) {
      return;
    }

    try {
      // تأجيل التفاعل
      await interaction.deferUpdate();
      handleButtonPress(interaction);
    } catch (e) {
      console.error('Error deferring update:', e);
    }
  }

  // menu handling
  if (interaction.isAnySelectMenu()) {
    if (interaction.replied || interaction.deferred) {
      return;
    }

    try {
      // تأجيل التفاعل
      await interaction.deferUpdate();
    } catch (e) {
      console.error('Error deferring update:', e);
    }
  }
});

function handleButtonPress(interaction) {
  // منطق التعامل مع الأزرار هنا
  if (interaction.customId === "skip") {
    // منطق زر "Skip"
  } else if (interaction.customId === "pauseresume") {
    // منطق زر "P/R"
  } else if (interaction.customId === "loop") {
    // منطق زر "Loop"
  } else if (interaction.customId === "stop") {
    // منطق زر "Stop"
  } else if (interaction.customId === "autoplay") {
    // منطق زر "Autoplay"
  }
}
