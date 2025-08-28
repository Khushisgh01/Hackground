const nodemailer = require('nodemailer');

function createTransport() {
  // If custom SMTP provided, use it; otherwise fall back to service-based auth
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  if (smtpHost && smtpPort) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  const service = (process.env.EMAIL_SERVICE || '').toLowerCase();
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!service || !user || !pass) {
    return null;
  }

  try {
    return nodemailer.createTransport({
      service: service,
      auth: { user, pass }
    });
  } catch (e) {
    return null;
  }
}

const transporter = createTransport();

async function sendEmail({ to, subject, text, html }) {
  if (!transporter) {
    // Mock email in development if transporter not configured
    console.log('[MOCK EMAIL] To:', to);
    console.log('Subject:', subject);
    if (text) console.log('Text:', text);
    if (html) console.log('HTML:', html);
    return { success: true, mock: true };
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  if (!from) throw new Error('Missing EMAIL_FROM/EMAIL_USER');

  const info = await transporter.sendMail({ from, to, subject, text, html });
  return { success: true, messageId: info.messageId };
}

function buildAlertEmail(alert, user) {
  const subject = `FamilySafe Alert: ${alert.title} (${alert.severity.toUpperCase()})`;
  const text = `Alert Type: ${alert.alertType}\nSeverity: ${alert.severity}\nTitle: ${alert.title}\nDescription: ${alert.description}\nLocation: ${alert.location || 'Unknown'}\nTime: ${new Date(alert.timestamp).toLocaleString()}\nUser: ${user?.firstName || ''} ${user?.lastName || ''}`;
  const html = `
    <h2>FamilySafe Alert</h2>
    <p><strong>Type:</strong> ${alert.alertType}</p>
    <p><strong>Severity:</strong> ${alert.severity.toUpperCase()}</p>
    <p><strong>Title:</strong> ${alert.title}</p>
    <p><strong>Description:</strong> ${alert.description}</p>
    <p><strong>Location:</strong> ${alert.location || 'Unknown'}</p>
    <p><strong>Time:</strong> ${new Date(alert.timestamp).toLocaleString()}</p>
    <p><strong>User:</strong> ${user?.firstName || ''} ${user?.lastName || ''}</p>
  `;
  return { subject, text, html };
}

module.exports = { sendEmail, buildAlertEmail };


