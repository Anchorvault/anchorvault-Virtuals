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

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server error (${res.status}). Make sure RESEND_API_KEY is set in Netlify env vars.`);
  }

  if (!res.ok || !data.success) {
    throw new Error(data.error || `Failed to send email (status ${res.status}).`);
  }
};
