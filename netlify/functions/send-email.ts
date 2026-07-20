import { Resend } from 'resend';
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // CORS headers so browser can call this
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in environment variables');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Email service not configured. Add RESEND_API_KEY to environment variables.' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      // Use 'onboarding@resend.dev' for testing (works without domain verification)
      // Once anchorvault.xyz domain is verified in Resend dashboard, change to:
      // 'AnchorVault <hello@anchorvault.xyz>'
      from: 'AnchorVault <onboarding@resend.dev>',
      to: [email],
      subject: '🎉 You\'re on the AnchorVault Waitlist — Access Secured!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 100%);padding:48px 40px;text-align:center;">
                    <p style="margin:0 0 8px;color:#10B981;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">AnchorVault x Virtuals Protocol</p>
                    <h1 style="margin:0;color:#fff;font-size:34px;font-weight:800;letter-spacing:-1px;">Access Secured! ✅</h1>
                    <p style="margin:14px 0 0;color:#94A3B8;font-size:16px;">You are officially in line for the protocol launch.</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 32px;">
                    <p style="margin:0 0 20px;color:#334155;font-size:17px;line-height:1.7;">Hi there! 👋</p>
                    <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.7;">
                      Thank you for subscribing to the <strong>AnchorVault x Virtuals Protocol</strong> newsletter.
                      You have successfully secured your spot in line for early access.
                    </p>

                    <!-- Highlight box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                      <tr>
                        <td style="background:#F0FDF4;border-left:4px solid #10B981;border-radius:0 12px 12px 0;padding:20px 24px;">
                          <p style="margin:0 0 10px;color:#0F172A;font-size:15px;font-weight:700;">What happens next?</p>
                          <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">
                            ✦ You'll be <strong>first to know</strong> when the TGE goes live<br/>
                            ✦ <strong>Exclusive architecture updates</strong> straight to your inbox<br/>
                            ✦ <strong>Early access</strong> to AnchorVault liquidity pools
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                      <tr>
                        <td align="center">
                          <a href="https://www.anchorvault.xyz"
                             style="display:inline-block;background:linear-gradient(135deg,#10B981,#059669);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:700;box-shadow:0 4px 14px rgba(16,185,129,0.35);">
                            Explore the Protocol →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#F8FAFC;padding:28px 40px;text-align:center;border-top:1px solid #E2E8F0;">
                    <a href="https://x.com/Anchor_Vault" style="color:#10B981;text-decoration:none;font-size:14px;font-weight:600;">@Anchor_Vault on X</a>
                    <p style="margin:16px 0 0;color:#CBD5E1;font-size:12px;">
                      © ${new Date().getFullYear()} AnchorVault Protocol · 
                      <a href="https://www.anchorvault.xyz" style="color:#94A3B8;text-decoration:none;">anchorvault.xyz</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', JSON.stringify(error));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message }),
      };
    }

    console.log('Email sent successfully. ID:', data?.id);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data?.id }),
    };

  } catch (err: any) {
    console.error('Unexpected error:', err?.message || err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err?.message || 'Internal server error' }),
    };
  }
};
