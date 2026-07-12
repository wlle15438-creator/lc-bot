import { createBotClient, type BotClient } from "./client";
import { allCommands } from "./commandRegistry";
import { deploySlashCommands } from "./deployCommands";
import { registerReady } from "./events/ready";
import { registerInteractionCreate } from "./events/interactionCreate";
import { registerMessageCreate } from "./events/messageCreate";
import { registerGuildMemberAdd } from "./events/guildMemberAdd";
import { registerGuildMemberRemove } from "./events/guildMemberRemove";
import { registerVoiceStateUpdate } from "./events/voiceStateUpdate";
import { registerGuildCreate } from "./events/guildCreate";
import { startPeriodicResetScheduler } from "./leveling/periodicResetScheduler";
import { startGiveawayPoller } from "./giveaways/giveawayManager";
import { discordEnv } from "./env";
import { logger } from "../lib/logger";

let client: BotClient | null = null;

export function getBotClient(): BotClient | null {
  return client;
}

export async function startBot(): Promise<BotClient> {
  const botClient = createBotClient();

  for (const command of allCommands) {
    botClient.commands.set(command.data.name, command);
  }

  registerReady(botClient);
  registerInteractionCreate(botClient);
  registerMessageCreate(botClient);
  registerGuildMemberAdd(botClient);
  registerGuildMemberRemove(botClient);
  registerVoiceStateUpdate(botClient);
  registerGuildCreate(botClient);
  startPeriodicResetScheduler();
  startGiveawayPoller(botClient);

  try {
    await deploySlashCommands();
  } catch (error) {
    logger.error({ err: error }, "Failed to register slash commands");
  }

  await botClient.login(discordEnv.token);
  client = botClient;
  return botClient;
}
