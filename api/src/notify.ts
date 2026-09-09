import nodemailer from "nodemailer";
import { env } from "./env.js";

function transporter() {
  if (!env.zohoSmtpUser || !env.zohoSmtpPass) return null;
  return nodemailer.createTransport({
    host: env.zohoSmtpHost,
    port: env.zohoSmtpPort,
    secure: env.zohoSmtpPort === 465,
    auth: {
      user: env.zohoSmtpUser,
      pass: env.zohoSmtpPass,
    },
  });
}

export async function sendMail(
  to: string,
  subject: string,
  html: string,
  extra?: { replyTo?: string; cc?: string; text?: string },
) {
  const mailer = transporter();
  if (!mailer || !to) return false;
  try {
    await mailer.sendMail({
      from: `"Kin and Compass" <${env.zohoSmtpUser}>`,
      to,
      cc: extra?.cc || undefined,
      subject,
      html,
      text: extra?.text,
      replyTo: extra?.replyTo,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendSms(to: string, body: string) {
  if (!env.twilioAccountSid || !env.twilioAuthToken || !env.twilioFrom) return false;
  const auth = Buffer.from(`${env.twilioAccountSid}:${env.twilioAuthToken}`).toString("base64");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: env.twilioFrom, Body: body }),
    },
  );
  return response.ok;
}
