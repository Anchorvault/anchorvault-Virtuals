import emailjs from '@emailjs/browser';

export const sendSubscriptionEmail = async (userEmail: string): Promise<void> => {
  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: userEmail,
      to_name: 'Web3 Pioneer',
      from_name: 'AnchorVault Protocol',
      reply_to: 'hello@anchorvault.xyz',
      message: `
Welcome to AnchorVault x Virtuals Protocol! 🎉

You have successfully subscribed to our newsletter and secured your spot in line for the protocol launch.

What happens next?
✦ You'll be FIRST to know when the TGE goes live
✦ Exclusive architecture updates straight to your inbox  
✦ Early access to AnchorVault liquidity pools

Explore: https://www.anchorvault.xyz
Twitter: https://x.com/Anchor_Vault

— The AnchorVault Team 🛡️
      `.trim(),
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
