/**
 * sendSubscriptionEmail
 * ──────────────────────
 * Uses Web3Forms (https://web3forms.com) — completely free, no backend needed.
 * 
 * Setup (takes 30 seconds):
 *  1. Go to https://web3forms.com
 *  2. Enter YOUR email (hello@anchorvault.xyz) → click "Create Access Key"
 *  3. Copy the access key → add to .env as VITE_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * 
 * What happens when someone subscribes:
 *  → Web3Forms emails YOU: "New subscriber: user@example.com"
 *  → Web3Forms emails THE USER: your custom welcome message (auto-reply)
 */
export const sendSubscriptionEmail = async (userEmail: string): Promise<void> => {
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!ACCESS_KEY) {
    throw new Error('Missing VITE_WEB3FORMS_KEY in environment variables.');
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: '🎉 New AnchorVault Newsletter Subscriber',
      from_name: 'AnchorVault Protocol',
      email: userEmail,                  // this is the subscriber's email

      // ── Auto-reply sent TO the subscriber ──────────────────────────────
      autoReply: true,
      autoReplyMessage: `Hi there! 👋

Welcome to AnchorVault x Virtuals Protocol — you're officially in! 🎉

✅ You have successfully subscribed to our newsletter.
✅ You are now in line for the protocol launch.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT HAPPENS NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• You'll be the first to know when the Token Generation Event (TGE) goes live.
• Exclusive architectural updates and insider intel — straight to your inbox.
• Early access to the AnchorVault liquidity pools before public launch.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STAY CONNECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Website:  https://www.anchorvault.xyz
🐦 Twitter:  https://x.com/Anchor_Vault
📩 Support:  hello@anchorvault.xyz

Thank you for believing in the future of decentralized cross-border settlements.

— The AnchorVault Team 🛡️`,

      // ── Notification body sent TO YOU (admin) ──────────────────────────
      message: `New newsletter subscriber: ${userEmail}\nTime: ${new Date().toISOString()}`,
    }),
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Web3Forms submission failed.');
  }
};
