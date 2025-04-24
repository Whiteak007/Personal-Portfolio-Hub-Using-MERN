const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_SENDGRID);

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const emailMsg = {
      to: "loginerwebsite@gmail.com",
      from: "loginerwebsite@gmail.com", // Must be verified in SendGrid
      subject: "Regarding Mern Portfolio App",
      html: `    <p>Dear <b><u>Coderak_</u></b>,</p>
                  <p>This email is to inform you about a new inquiry received through your portfolio website's contact form.</p>
                  <p>Here are the details submitted by the user:</p>
                  <ul>
                      <li><b><u>Name:</u></b> ${name}</li>
                      <li><b><u>Email:</u></b> ${email}</li>
                      <li><b><u>Message:</u></b></li>
                      <ul>
                          <li><p>${msg}</p></li>
                      </ul>
                  </ul>
                  <p>Please log in to your website's backend or check your designated email address to view the complete message and any other details provided.</p>
                  <p>Thank you for using our service.</p>
                  <p>Have a nice day.</p>`,
    };

    await sgMail.send(emailMsg);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Email failed to send",
        error: error.message,
      });
  }
};

module.exports = { sendEmailController };
