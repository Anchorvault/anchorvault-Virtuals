/**
 * 1. Saves subscriber email to Google Sheet (via Apps Script webhook)
 * 2. Shows success — email confirmed
 *
 * Set in your hosting env vars:
 *   VITE_SHEETS_URL = https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */
export const sendSubscriptionEmail = async (userEmail: string): Promise<void> => {
  const sheetsUrl = import.meta.env.VITE_SHEETS_URL;

  if (!sheetsUrl) {
    // Dev mode — just log, don't fail
    console.warn('VITE_SHEETS_URL not set. Skipping sheet save in dev mode.');
    return;
  }

  // Save to Google Sheet
  const res = await fetch(sheetsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // Apps Script requires text/plain for CORS
    body: JSON.stringify({
      email: userEmail,
      source: 'AnchorVault x Virtuals Waitlist',
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!data.success) {
    throw new Error(data.error || 'Could not save your email. Please try again.');
  }
};
