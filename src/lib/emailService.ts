import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────
// EmailJS Config — fill these in from https://emailjs.com
// ─────────────────────────────────────────────────────────
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_anchorvault';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_waitlist';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

/**
 * Sends two emails via EmailJS (purely client-side, no backend required):
 *  1. A welcome confirmation email TO the subscriber.
 *  2. An internal notification TO the admin.
 */
export const sendWaitlistEmail = async (userEmail: string): Promise<void> => {
  // Template params match the variables in your EmailJS template
  const templateParams = {
    to_email:    userEmail,
    from_name:   'AnchorVault Protocol',
    reply_to:    'hello@anchorvault.xyz',
    message: `
      🎉 Welcome to AnchorVault x Virtuals Protocol!

      You have successfully subscribed to our newsletter.
      You are now officially in line for the protocol launch.

      What's next?
      ─────────────────────────────────────────────────────
      • We will notify you the moment the Token Generation Event (TGE) goes live.
      • Exclusive architectural updates and insider intel — straight to your inbox.
      • Early access to the AnchorVault liquidity pools.

      Follow us on X for real-time updates: https://x.com/Anchor_Vault
      Explore the protocol: https://www.anchorvault.xyz

      Thank you for joining the future of decentralized cross-border settlements.

      — The AnchorVault Team
    `,
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
