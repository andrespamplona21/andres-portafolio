---
title: "Formularios de contacto que de verdad llegan al correo"
date: "2026-03-18"
excerpt: "Resend, Nodemailer y por qué un formulario bonito que no entrega nada es peor que no tener formulario."
---

Un formulario de contacto tiene un solo trabajo: que el mensaje llegue. Y es sorprendente cuántos fallan callados — el usuario ve "¡Enviado!" y el correo nunca aparece.

## Nunca confíes solo en el front

La validación en el navegador es para la experiencia, no para la seguridad. **Siempre** revalida en el servidor: tipos, longitudes mínimas, formato del email. Un campo de mensaje vacío o un email inválido se rechazan antes de intentar enviar nada.

```js
if (
  typeof email !== "string" ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
  message.length < 10
) {
  return Response.json({ error: "Datos inválidos." }, { status: 400 });
}
```

## Resend para apps nuevas, Nodemailer cuando ya hay SMTP

En proyectos nuevos uso **Resend**: API limpia, plan gratis generoso y no peleas con SMTP. En proyectos que ya tenían un correo corporativo con SMTP, **Nodemailer** apunta a ese servidor y listo.

El truco con cualquiera de los dos: pon `replyTo` con el correo de quien escribe. Así respondes desde tu bandeja con un clic, sin copiar y pegar la dirección.

## El detalle del remitente

No puedes enviar "desde" un dominio que no controlas — los servidores lo marcan como spam o lo rechazan. Con Resend, hasta verificar tu dominio usas su remitente de pruebas, que solo entrega a tu propio correo. Suficiente para un formulario de contacto personal; para producción, verificas el dominio.

## Un honeypot básico contra bots

Un campo oculto que un humano nunca llena pero un bot sí. Si viene relleno, descartas en silencio. Cero fricción para personas, ruido fuera.

Nada de esto es difícil. Pero "enviado" tiene que significar *enviado*, no *esperemos que sí*.
