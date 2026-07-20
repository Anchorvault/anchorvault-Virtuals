export const sendWaitlistEmail = async (userEmail: string) => {
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error("Missing Resend API Key");
    return;
  }

  // Custom premium template for the waitlist email
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      
      <!-- Header with Dual Branding -->
      <div style="background-color: #0F172A; background-image: linear-gradient(to bottom right, #0F172A, #1E293B); padding: 48px 32px; text-align: center;">
        <div style="margin-bottom: 24px;">
          <img src="https://www.anchorvault.xyz/logo.png" alt="AnchorVault" style="height: 56px; vertical-align: middle;" onerror="this.style.display='none'" />
          <span style="color: #64748B; font-size: 28px; font-weight: 300; margin: 0 20px; vertical-align: middle;">x</span>
          <img src="https://www.anchorvault.xyz/virtual-logo.png" alt="Virtuals" style="height: 48px; vertical-align: middle;" onerror="this.style.display='none'" />
        </div>
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; text-transform: uppercase;">The Vault is Opening</h1>
        <p style="color: #10B981; margin: 12px 0 0 0; font-size: 16px; font-weight: 600; letter-spacing: 1px;">YOU ARE OFFICIALLY SECURED</p>
      </div>

      <!-- Main Content -->
      <div style="padding: 40px 32px; background-color: #ffffff;">
        <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 0;">Hi there,</p>
        <p style="color: #334155; font-size: 16px; line-height: 1.6;">
          Thank you for joining the exclusive waitlist. You have successfully locked in your spot for early access to the AnchorVault x Virtuals ecosystem.
        </p>
        <p style="color: #334155; font-size: 16px; line-height: 1.6;">
          We are bridging global stablecoin reserves with decentralized autonomous agents to enable instant, zero-friction cross-border remittances—all secured on-chain.
        </p>
        
        <div style="margin: 32px 0; padding: 24px; background-color: #F8FAFC; border-left: 4px solid #10B981; border-radius: 0 8px 8px 0;">
          <h3 style="margin: 0 0 8px 0; color: #0F172A; font-size: 18px;">What's next?</h3>
          <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.5;">Keep a close eye on your inbox. We will send you exclusive architectural updates and notify you the exact moment the Token Generation Event (TGE) goes live.</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
          <a href="https://www.anchorvault.xyz" style="display: inline-block; background-color: #10B981; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.39);">Explore the Protocol</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #F8FAFC; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 13px; margin: 0 0 12px 0;">Follow us on X for real-time updates</p>
        <a href="https://x.com/Anchor_Vault" style="color: #10B981; text-decoration: none; font-size: 14px; font-weight: 600;">@Anchor_Vault</a>
        <p style="color: #cbd5e1; font-size: 12px; margin: 24px 0 0 0;">© ${new Date().getFullYear()} AnchorVault Protocol. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    // We use a local Vite proxy to completely bypass browser CORS blocks locally
    const response = await fetch("/api/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "AnchorVault <hello@anchorvault.xyz>", // Updated to verified domain
        to: [userEmail],
        subject: "🎉 You are on the AnchorVault Waitlist!",
        html: htmlContent
      })
    });

    const data = await response.json();
    console.log("Resend API Response:", data);
  } catch (error) {
    console.error("Error sending email via Resend:", error);
  }
};
