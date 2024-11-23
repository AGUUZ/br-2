const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  description: `change volume of current queue`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {

    const requiredRoleId = '1292957063311527967'; // استبدل هذا بـ ID الرتبة
    
    // التحقق مما إذا كان المستخدم يملك صلاحية Administrator
    const hasAdminPermission = message.member.permissions.has(PermissionFlagsBits.Administrator);

    // الحصول على الرتبة من السيرفر باستخدام ID
    const requiredRole = message.guild.roles.cache.get(requiredRoleId);

    // التحقق مما إذا كان المستخدم يملك الرتبة المطلوبة أو لديه صلاحية Administrator
    const hasRole = message.member.roles.cache.has(requiredRoleId);

    if (!hasAdminPermission && !hasRole) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} You need the ${requiredRole} role to use this command!`
      );
    }
    
    // Code
    let volume = Number(args[0]);
    if (!volume) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} Please Provide Volume %`
      );
    } else if (volume > 250) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} Provide Volume Amount Between 1 - 250  !!`
      );
    } else {
      await queue.setVolume(volume);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} Volume Set to ${queue.volume}% !!`
      );
    }
  },
};
