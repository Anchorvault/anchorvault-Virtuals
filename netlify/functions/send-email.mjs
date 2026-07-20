export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  const { email } = JSON.parse(event.body || '{}');
  if (!email) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email required' }) };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AnchorVault <onboarding@resend.dev>',
      to: [email],
      subject: '🎉 You\'re on the AnchorVault Waitlist — Access Secured!',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#0F172A,#1E3A5F);padding:48px 40px;text-align:center;">
            <p style="margin:0 0 8px;color:#10B981;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">AnchorVault x Virtuals Protocol</p>
            <h1 style="margin:0;color:#fff;font-size:34px;font-weight:800;">Access Secured! ✅</h1>
            <p style="margin:14px 0 0;color:#94A3B8;font-size:16px;">You are officially in line for the protocol launch.</p>
          </div>
          <div style="padding:40px;background:#fff;">
            <p style="color:#334155;font-size:17px;line-height:1.7;">Hi there! 👋</p>
            <p style="color:#334155;font-size:16px;line-height:1.7;">
              Thank you for subscribing to the <strong>AnchorVault x Virtuals Protocol</strong> newsletter.
              You have successfully secured your spot for early access.
            </p>
            <div style="background:#F0FDF4;border-left:4px solid #10B981;border-radius:0 12px 12px 0;padding:20px 24px;margin:24px 0;">
              <p style="margin:0 0 8px;color:#0F172A;font-size:15px;font-weight:700;">What happens next?</p>
              <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">
                ✦ You'll be <strong>first to know</strong> when the TGE goes live<br/>
                ✦ <strong>Exclusive updates</strong> straight to your inbox<br/>
                ✦ <strong>Early access</strong> to AnchorVault liquidity pools
              </p>
            </div>
            <div style="text-align:center;margin-top:32px;">
              <a href="https://www.anchorvault.xyz" style="display:inline-block;background:linear-gradient(135deg,#10B981,#059669);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:700;">
                Explore the Protocol →
              </a>
            </div>
          </div>
          <div style="background:#F8FAFC;padding:28px 40px;text-align:center;border-top:1px solid #E2E8F0;">
            <a href="https://x.com/Anchor_Vault" style="color:#10B981;text-decoration:none;font-size:14px;font-weight:600;">@Anchor_Vault on X</a>
            <p style="margin:16px 0 0;color:#CBD5E1;font-size:12px;">© ${new Date().getFullYear()} AnchorVault Protocol · anchorvault.xyz</p>
          </div>
        </div>
      `,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('Resend error:', JSON.stringify(data));
    return { statusCode: 500, headers, body: JSON.stringify({ error: data?.message || 'Resend API failed' }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
}
