// Netlify Serverless Function — called by frontend, uses Resend server-side
export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  const { email } = JSON.parse(event.body || '{}');

  if (!email || !email.includes('@')) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'RESEND_API_KEY not configured in Netlify env vars' }) };
  }

  const sendEmail = async (to, subject, html) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: 'AnchorVault <onboarding@resend.dev>', to, subject, html }),
    });
    return res.json();
  };

  // 1. Welcome email TO the subscriber
  await sendEmail(
    [email],
    "🎉 You're on the AnchorVault Waitlist!",
    `<div style="font-family:sans-serif;max-width:560px;margin:auto;">
      <div style="background:linear-gradient(135deg,#0F172A,#1E3A5F);padding:40px;text-align:center;border-radius:16px 16px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:28px;">Access Secured! ✅</h1>
        <p style="color:#10B981;margin:10px 0 0;font-weight:700;letter-spacing:2px;font-size:13px;">ANCHORVAULT x VIRTUALS PROTOCOL</p>
      </div>
      <div style="background:#fff;padding:36px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;">
        <p style="color:#334155;font-size:16px;line-height:1.7;">Hi there! 👋</p>
        <p style="color:#334155;font-size:16px;line-height:1.7;">You've successfully subscribed and secured your spot in line for the <strong>AnchorVault protocol launch</strong>.</p>
        <div style="background:#F0FDF4;border-left:4px solid #10B981;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
          <strong style="color:#064e3b;">What's next?</strong>
          <p style="color:#475569;margin:8px 0 0;font-size:14px;line-height:1.7;">
            ✦ First to know when TGE goes live<br/>
            ✦ Exclusive updates straight to your inbox<br/>
            ✦ Early access to AnchorVault liquidity pools
          </p>
        </div>
        <div style="text-align:center;margin-top:28px;">
          <a href="https://www.anchorvault.xyz" style="background:#10B981;color:#fff;padding:14px 36px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;">Explore the Protocol →</a>
        </div>
        <p style="margin-top:32px;color:#94a3b8;font-size:12px;text-align:center;">© ${new Date().getFullYear()} AnchorVault Protocol · <a href="https://x.com/Anchor_Vault" style="color:#10B981;">@Anchor_Vault</a></p>
      </div>
    </div>`
  );

  // 2. Admin notification TO you
  await sendEmail(
    ['hello@anchorvault.xyz'],
    `🔔 New Subscriber: ${email}`,
    `<p style="font-family:sans-serif;font-size:16px;color:#334155;">
      New newsletter subscriber:<br/><br/>
      <strong style="font-size:18px;">${email}</strong><br/><br/>
      Time: ${new Date().toUTCString()}
    </p>`
  );

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
}
