/**
 * Sends subscription notification via Web3Forms.
 * 
 * Setup (30 seconds):
 * 1. Go to https://web3forms.com
 * 2. Enter hello@anchorvault.xyz → Click "Create Access Key"
 * 3. Copy the key → add to hosting env as VITE_WEB3FORMS_KEY=your-key-here
 */
export const sendSubscriptionEmail = async (userEmail: string): Promise<void> => {
  const key = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!key || key === 'your-key-here') {
    // Dev mode — skip silently so UI still works locally
    console.warn('VITE_WEB3FORMS_KEY not set. Email not sent.');
    return;
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: '🎉 New AnchorVault Newsletter Subscriber',
      from_name: 'AnchorVault Protocol',
      email: userEmail,
      message: `New subscriber: ${userEmail}\nTime: ${new Date().toLocaleString()}`,
      // Auto-reply to subscriber
      botcheck: false,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.message || 'Submission failed. Check VITE_WEB3FORMS_KEY.');
  }
};
