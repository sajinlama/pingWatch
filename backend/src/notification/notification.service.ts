import { telBot } from "../bot/bot";
import { pool } from "../config/db";


export type MonitorStatus = "UP" | "DOWN" | "UNKNOWN" | "PAUSED";

export interface NotifyMonitorStatusChangeParams {
  monitorId: string;
  previousStatus: MonitorStatus | null;
  newStatus: MonitorStatus;
}

interface MonitorWithUser {
  monitor_id: string;
  monitor_name: string | null;
  url: string;
  http_status: number | null;
  response_time: number | null;
  user_id: string;
  telegram_chat_id: string | null; // pg returns BIGINT as string
}

function buildMessage(
  monitor: MonitorWithUser,
  newStatus: MonitorStatus,
  errorMessage: string | null
): string {
  const label = monitor.monitor_name || monitor.url;

  if (newStatus === "DOWN") {
    return (
      `🔴 ${label} is DOWN\n` +
      `URL: ${monitor.url}` +
      (monitor.http_status ? `\nHTTP Status: ${monitor.http_status}` : "") +
      (errorMessage ? `\nError: ${errorMessage}` : "")
    );
  }

  if (newStatus === "UP") {
    return (
      `🟢 ${label} is back UP\n` +
      `URL: ${monitor.url}` +
      (monitor.response_time != null ? `\nResponse time: ${monitor.response_time}ms` : "")
    );
  }

  return `⚪ ${label} status changed to ${newStatus}\nURL: ${monitor.url}`;
}

async function sendTelegram(monitor: MonitorWithUser, message: string): Promise<boolean> {
  if (!monitor.telegram_chat_id) return false;
  try {
    await telBot.api.sendMessage(Number(monitor.telegram_chat_id), message);
    return true;
  } catch (err) {
    console.error(`[Notification] Failed to Telegram ${monitor.telegram_chat_id}:`, err);
    return false;
  }
}

async function recordNotification(monitorId: string, message: string): Promise<void> {
  await pool.query(
    `INSERT INTO notifications (monitor_id, type, message) VALUES ($1, 'TELEGRAM', $2)`,
    [monitorId, message]
  );
}

export const notifyMonitorStatusChange = async ({
  monitorId,
  newStatus,
}: NotifyMonitorStatusChangeParams): Promise<void> => {
  const { rows } = await pool.query<MonitorWithUser>(
    `SELECT
        m.id            AS monitor_id,
        m.name          AS monitor_name,
        m.url,
        m.http_status,
        m.response_time,
        u.id            AS user_id,
        u.telegram_chat_id
     FROM monitors m
     JOIN users u ON u.id = m.user_id
     WHERE m.id = $1`,
    [monitorId]
  );

  const monitor = rows[0];
  if (!monitor) {
    console.error(`[Notification] Monitor ${monitorId} not found, skipping`);
    return;
  }

  if (!monitor.telegram_chat_id) {
    console.log(`[Notification] User for monitor ${monitorId} has no linked Telegram, skipping`);
    return;
  }

  const { rows: logRows } = await pool.query<{ error_message: string | null }>(
    `SELECT error_message FROM monitor_logs
     WHERE monitor_id = $1
     ORDER BY checked_at DESC
     LIMIT 1`,
    [monitorId]
  );
  const errorMessage = logRows[0]?.error_message ?? null;

  const message = buildMessage(monitor, newStatus, errorMessage);

  const sent = await sendTelegram(monitor, message);
  if (sent) await recordNotification(monitorId, message);
};