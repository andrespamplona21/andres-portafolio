import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      name.length < 2 ||
      message.length < 10 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Datos inválidos." },
        { status: 400 }
      );
    }

    // Honeypot básico — si quieres, agrega un campo oculto en el form
    if (message.length > 4000) {
      return NextResponse.json({ error: "Mensaje muy largo." }, { status: 400 });
    }

    if (!resend) {
      // Modo dev sin key — solo loguea
      console.log("[contact form]", { name, email, message });
      return NextResponse.json({ ok: true });
    }

    await resend.emails.send({
      // onboarding@resend.dev funciona sin verificar dominio (solo puede
      // enviar a tu propio correo de la cuenta). Para enviar a cualquiera,
      // verifica tu dominio en Resend y cambia este "from".
      from: process.env.CONTACT_FROM ?? "Portafolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "andrespamplonao@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
