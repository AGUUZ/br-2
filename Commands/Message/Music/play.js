const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "play",
  aliases: ["p", "song"],
  description: `Play your favorite song by name/link`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: false,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, message, args, queue) => {
    // تحديد ID الرتبة المسموح لها بتشغيل الموسيقى
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

    // التأكد من أن المستخدم أدخل اسم الأغنية أو الرابط
    let song = args.join(" ");
    if (!song) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} You Need to Provide Song Name/Link`
      );
    } else {
      let { channel } = message.member.voice;
      client.distube.play(channel, song, {
        member: message.member,
        textChannel: message.channel,
        message: message,
      });
    }
  },
};
