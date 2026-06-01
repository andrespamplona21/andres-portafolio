---
title: "Contact forms that actually reach the inbox"
date: "2026-03-18"
excerpt: "Resend, Nodemailer, and why a pretty form that delivers nothing is worse than no form at all."
---

A contact form has one job: get the message through. And it's surprising how many fail silently, the user sees "Sent!" and the email never shows up.

## Never trust the front end alone

Browser validation is for the experience, not for security. **Always** revalidate on the server: types, minimum lengths, email format. An empty message field or an invalid email gets rejected before you try to send anything.

```js
if (
  typeof email !== "string" ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
  message.length < 10
) {
  return Response.json({ error: "Invalid data." }, { status: 400 });
}
```

## Resend for new apps, Nodemailer when SMTP already exists

On new projects I use **Resend**: clean API, generous free tier, and no fighting with SMTP. On projects that already had a corporate mailbox with SMTP, **Nodemailer** points at that server and you're done.

The trick with either one: set `replyTo` to the sender's email. That way you reply from your inbox with one click, no copy-pasting the address.

## The sender detail

You can't send "from" a domain you don't control, servers flag it as spam or reject it. With Resend, until you verify your domain you use their test sender, which only delivers to your own email. Enough for a personal contact form; for production, you verify the domain.

## A basic honeypot against bots

A hidden field a human never fills but a bot does. If it comes back filled, discard it silently. Zero friction for people, noise out.

None of this is hard. But "sent" has to mean *sent*, not *let's hope so*.
