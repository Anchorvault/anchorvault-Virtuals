/**
 * Calls the Netlify serverless function which uses Resend to
 * send a welcome email to the subscriber. No API key exposed to the browser.
 */
export const sendSubscriptionEmail = async (userEmail: string): Promise<void> => {
  const res = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to send email.');
  }
};
