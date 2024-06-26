const { codeBlock } = require("@discordjs/builders");
//
exports.run = async(client, message, args, level) => {
	var fs = require("fs")
		var argu = ""
		for (var i = 1; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		if (!args[0]) {
			var rankData = fs.readFileSync("./commandStorage/ranks.txt", "utf8")
				message.channel.send(codeBlock("asciidoc", "== Alchemy Den Ranks ==\n" + rankData));
				return
		}
		if (args[0] == "create") {
			if (!args[1]) {
				message.channel.send("I need a name of a role to make.")
				return
			}
			if (message.member.roles.cache.find(r => r.name === "Moderator")) {
				message.guild.roles.create({
  data: {
    name: argu,
    color: 0,}
})
				var rankData = fs.readFileSync("./commandStorage/ranks.txt", "utf8")
					rankData += "\n" + argu
					fs.writeFileSync("./commandStorage/ranks.txt", rankData)
					message.channel.send("Created the Rank " + argu)
			} else {
				message.channel.send("You need to be a moderator to create or delete ranks.")
				return
			}

		} // End of Create

		if (args[0] == "list") {
			var rankData = fs.readFileSync("./commandStorage/ranks.txt", "utf8")
				message.channel.send(codeBlock("asciidoc", "== Alchemy Den Ranks ==\n" + rankData));
				return
		}

		if (args[0] == "delete") {
			if (message.member.roles.cache.find(r => r.name === "Moderator")) {
				var rankData = fs.readFileSync("./commandStorage/ranks.txt", "utf8")
					if (rankData.includes(argu)) {
						message.guild.roles.cache.find(role => role.name === argu).delete();
						rankData = rankData.replace("\n" + argu, "")
							fs.writeFileSync("./commandStorage/ranks.txt", rankData)
							message.channel.send("Deleted the rank")
							return
					} else {
						message.channel.send("I cannot delete that rank!")
						return
					}
			} else {
				message.channel.send("You need to be a moderator to create or delete ranks.")
				return
			}
			if (!args[1]) {
				message.channel.send("I need a rank to delete!")
				return
			}

		}

		var theRank = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				theRank += args[i];
			else
				theRank += args[i] + " ";
		}
		var rankData = fs.readFileSync(__dirname + "/../commandStorage/ranks.txt", "utf8")
		if (rankData.toLowerCase().includes(theRank.toLowerCase())) {
			message.channel.send(theRank)
			console.log(message.guild.roles.cache);
			let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === theRank.toLowerCase())
				if (message.member.roles.cache.find(r => r.name.toLowerCase() === theRank.toLowerCase())) {
					message.member.roles.remove(role);
					
					message.channel.send("You were removed from " + role.name)
				} else {
					message.member.roles.add(role)
					message.channel.send("You were added to " + role.name)
				}

		}

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["ranks"],
	permLevel: "User"
};

exports.help = {
	name: "rank",
	category: "Custom Commands",
	description: "List, Join, Leave, Create, or Delete a rank",
	usage: "rank <rank | list | create | delete>"
};
