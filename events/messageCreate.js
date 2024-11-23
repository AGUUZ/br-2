const { cooldown, check_dj, databasing } = require("../handlers/functions");
const client = require("..");
const { PREFIX: botPrefix, emoji } = require("../settings/config");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;
  await databasing(message.guildId, message.author.id);
  
  let settings = await client.music.get(message.guild.id);
  let prefix = settings?.prefix || botPrefix;
  
  // التعبير العادي لتحديد الـ prefix أو ذكر البوت
  let mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );

  const handleStopCommand = async () => {
    const cmd = "stop"; // تحديد الأمر كـ stop مباشرة
    const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;

    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.members.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    // تحقق من الأذونات
    if (
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.embed(
        message,
        `You Don't Have Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.embed(
        message,
        `I Don't Have Permission to Run \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown, wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    } else {
      command.run(client, message, [], null, queue); // تمرير args فارغ
    }
  };
  const handleSkipCommand = async () => {
    const cmd = "skip"; // تحديد الأمر كـ skip مباشرة
    const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;

    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.members.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    // تحقق من الأذونات
    if (
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.embed(
        message,
        `You Don't Have Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.embed(
        message,
        `I Don't Have Permission to Run \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown, wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    } else {
      command.run(client, message, [], null, queue); // تمرير args فارغ
    }
  };

  const handlePlayCommand = async (args) => {
    const cmd = "play"; // تحديد الأمر كـ play مباشرة
    const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;

    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.members.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    // تحقق من الأذونات
    if (
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.embed(
        message,
        `You Don't Have Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.embed(
        message,
        `I Don't Have Permission to Run \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown, wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    } else {
      command.run(client, message, args, null, queue); // تمرير args بدون nprefix
    }
  };

  if (message.content.toLowerCase() === "ك") {
    const handleLoopCommand = async (args) => {
      const cmd = "loop"; // تحديد الأمر كـ loop مباشرة
      const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
      if (!command) return;

      let queue = client.distube.getQueue(message.guild.id);
      let voiceChannel = message.member.voice.channel;
      let botChannel = message.guild.members.me.voice.channel;
      let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

      // تحقق من الأذونات
      if (
        !message.member.permissions.has(
          PermissionsBitField.resolve(command.userPermissions)
        )
      ) {
        return client.embed(
          message,
          `You Don't Have Permission to Use \`${command.name}\` Command!!`
        );
      } else if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPermissions)
        )
      ) {
        return client.embed(
          message,
          `I Don't Have Permission to Run \`${command.name}\` Command!!`
        );
      } else if (cooldown(message, command)) {
        return client.embed(
          message,
          ` You are On Cooldown, wait \`${cooldown(
            message,
            command
          ).toFixed()}\` Seconds`
        );
      } else if (command.inVoiceChannel && !voiceChannel) {
        return client.embed(
          message,
          `${emoji.ERROR} You Need to Join Voice Channel`
        );
      } else if (
        command.inSameVoiceChannel &&
        botChannel &&
        !botChannel?.equals(voiceChannel)
      ) {
        return client.embed(
          message,
          `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
        );
      } else if (command.Player && !queue) {
        return client.embed(message, `${emoji.ERROR} Music Not Playing`);
      } else if (command.djOnly && checkDJ) {
        return client.embed(
          message,
          `${emoji.ERROR} You are not DJ and also you are not song requester..`
        );
      } else {
        // تمرير args لتمكين الـ loop الافتراضي (تكرار الأغنية)
        command.run(client, message, ["song"], null, queue);
      }
    };

    await handleLoopCommand([]);
  }
  
  const handleVolumeCommand = async (args) => {
    const cmd = "volume"; // تحديد الأمر كـ volume مباشرة
    const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;

    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.members.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    // تحقق من الأذونات
    if (
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.embed(
        message,
        `You Don't Have Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.embed(
        message,
        `I Don't Have Permission to Run \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown, wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    }

    // تحقق من وجود قيمة لمستوى الصوت
    let volume = Number(args[0]);
    if (!volume) {
      return client.embed(
        message,
        `${emoji.ERROR} Please Provide Volume %`
      );
    } else if (volume > 250) {
      return client.embed(
        message,
        `${emoji.ERROR} Provide Volume Amount Between 1 - 250  !!`
      );
    } else {
      await queue.setVolume(volume);
      client.embed(
        message,
        `${emoji.SUCCESS} Volume Set to ${queue.volume}% !!`
      );
    }
  };

  // التعامل مع الأمر "s" لتخطي الأغنية
  if (message.content.toLowerCase() === "ت") {
    await handleSkipCommand();
  }

  if (message.content.toLowerCase() === "تخطي") {
    await handleSkipCommand();
  }

  // التعامل مع الأمر "b" لإيقاف الأغنية
  if (message.content.toLowerCase() === "س") {
    await handleStopCommand();
  }

  if (message.content.toLowerCase() === "قف") {
    await handleStopCommand();
  }

  // التعامل مع الأمر "ش " (play)
  if (message.content.toLowerCase().startsWith("ش ")) {
    const args = message.content.slice("ش ".length).trim().split(/ +/);
    await handlePlayCommand(args);
  }

  // التعامل مع الأمر "شغل " (play)
  if (message.content.toLowerCase().startsWith("شغل ")) {
    const args = message.content.slice("شغل ".length).trim().split(/ +/);
    await handlePlayCommand(args);
  }

  if (message.content.toLowerCase().startsWith("ص ")) {
    const args = message.content.slice("ص ".length).trim().split(/ +/);
    await handleVolumeCommand(args);
  }

  // التعامل مع الأمر "v" فقط بدون نسبة الصوت
  if (message.content.toLowerCase() === "ص") {
    return client.embed(
      message,
      `${emoji.ERROR} Please Provide a Volume %`
    );
  }
  // إذا كانت الرسالة تتطابق مع الـ prefix المعتاد، قم بمعالجة الأوامر كالمعتاد
  const [, nprefix] = message.content.match(mentionprefix) || [];
  if (!nprefix) return;
  
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) {
    if (nprefix.includes(client.user.id)) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setDescription(
              ` ${emoji.SUCCESS} To See My All Commands Type \`${prefix}help\``
            ),
        ],
      });
    }
  }

  const command =
    client.mcommands.get(cmd) ||
    client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    
  if (!command) return;

  if (command) {
    let queue = client.distube.getQueue(message.guild.id);
    let voiceChannel = message.member.voice.channel;
    let botChannel = message.guild.members.me.voice.channel;
    let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

    if (
      !message.member.permissions.has(
        PermissionsBitField.resolve(command.userPermissions)
      )
    ) {
      return client.embed(
        message,
        `You Don't Have Permission to Use \`${command.name}\` Command!!`
      );
    } else if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(command.botPermissions)
      )
    ) {
      return client.embed(
        message,
        `I Don't Have Permission to Run \`${command.name}\` Command!!`
      );
    } else if (cooldown(message, command)) {
      return client.embed(
        message,
        ` You are On Cooldown , wait \`${cooldown(
          message,
          command
        ).toFixed()}\` Seconds`
      );
    } else if (command.inVoiceChannel && !voiceChannel) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join Voice Channel`
      );
    } else if (
      command.inSameVoiceChannel &&
      botChannel &&
      !botChannel?.equals(voiceChannel)
    ) {
      return client.embed(
        message,
        `${emoji.ERROR} You Need to Join ${botChannel} Voice Channel`
      );
    } else if (command.Player && !queue) {
      return client.embed(message, `${emoji.ERROR} Music Not Playing`);
    } else if (command.djOnly && checkDJ) {
      return client.embed(
        message,
        `${emoji.ERROR} You are not DJ and also you are not song requester..`
      );
    } else {
      command.run(client, message, args, nprefix, queue);
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
