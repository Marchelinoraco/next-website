import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, phone, message } = await req.json();

    if (!name || !email || !subject || !phone || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Semua field harus diisi!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gunakan environment variable
        pass: process.env.EMAIL_PASS, // Gunakan environment variable
      },
    });

    // Konfigurasi email yang akan dikirim
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "admin@example.com", // Ganti dengan email tujuan
      subject: `Laporan dari ${name} - ${subject}`,
      text: `
        Nama: ${name}
        Email: ${email}
        Nomor HP: ${phone}
        Pesan: ${message}
      `,
    };

    // Kirim email
    const info = await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email berhasil dikirim!",
        info,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error mengirim email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Gagal mengirim email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
