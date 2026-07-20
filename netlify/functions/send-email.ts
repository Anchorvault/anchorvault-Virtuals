import { Resend } from 'resend';
import type { Handler } from '@netlify/functions';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');

    if (!email || !email.includes('@')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    // ── Send welcome email TO the subscriber ────────────────────────────
    const { error } = await resend.emails.send({
      from: 'AnchorVault <hello@anchorvault.xyz>',
      to: [email],
      subject: '🎉 You\'re on the AnchorVault Waitlist — Access Secured!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to AnchorVault</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 100%);padding:48px 40px;text-align:center;">
                      <p style="margin:0 0 8px 0;color:#10B981;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">AnchorVault x Virtuals Protocol</p>
                      <h1 style="margin:0;color:#ffffff;font-size:36px;font-weight:800;letter-spacing:-1px;line-height:1.2;">Access Secured! ✅</h1>
                      <p style="margin:16px 0 0 0;color:#94A3B8;font-size:16px;">You are officially in line for the protocol launch.</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 40px 32px;">
                      <p style="margin:0 0 20px;color:#334155;font-size:17px;line-height:1.7;">Hi there! 👋</p>
                      <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.7;">
                        Thank you for subscribing to the <strong>AnchorVault x Virtuals Protocol</strong> newsletter.
                        You have successfully secured your spot in line for early access to the protocol launch.
                      </p>

                      <!-- Green highlight box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                        <tr>
                          <td style="background:#F0FDF4;border-left:4px solid #10B981;border-radius:0 12px 12px 0;padding:20px 24px;">
                            <p style="margin:0 0 10px;color:#0F172A;font-size:16px;font-weight:700;">What happens next?</p>
                            <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                              ✦ You'll be <strong>first to know</strong> when the TGE (Token Generation Event) goes live<br/>
                              ✦ <strong>Exclusive architecture updates</strong> and insider intel — straight to your inbox<br/>
                              ✦ <strong>Early access</strong> to AnchorVault liquidity pools before public launch
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 32px;color:#334155;font-size:16px;line-height:1.7;">
                        We are bridging global stablecoin reserves with decentralized autonomous agents to enable instant, zero-friction cross-border remittances — all secured on-chain.
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="https://www.anchorvault.xyz" style="display:inline-block;background:linear-gradient(135deg,#10B981,#059669);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:700;letter-spacing:0.5px;box-shadow:0 4px 14px rgba(16,185,129,0.35);">
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
                      <p style="margin:0 0 12px;color:#94A3B8;font-size:13px;">Follow us for real-time updates</p>
                      <a href="https://x.com/Anchor_Vault" style="color:#10B981;text-decoration:none;font-size:14px;font-weight:600;">@Anchor_Vault on X (Twitter)</a>
                      <p style="margin:20px 0 0;color:#CBD5E1;font-size:12px;">
                        © ${new Date().getFullYear()} AnchorVault Protocol. All rights reserved.<br/>
                        <a href="https://www.anchorvault.xyz" style="color:#94A3B8;text-decoration:none;">www.anchorvault.xyz</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Welcome email sent!' }),
    };

  } catch (err: any) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Internal server error' }) };
  }
};
