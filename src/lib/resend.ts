export const sendWaitlistEmail = async (userEmail: string) => {
  try {
    const response = await fetch("/api/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail })
    });

    const data = await response.json();
    console.log("Serverless Function Response:", data);
  } catch (error) {
    console.error("Error sending email via Serverless Function:", error);
  }
};
