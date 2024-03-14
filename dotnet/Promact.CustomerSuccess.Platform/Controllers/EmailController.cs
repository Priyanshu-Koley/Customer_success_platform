using Microsoft.AspNetCore.Mvc;
using Promact.CustomerSuccess.Platform.Entities;
using System.Net;
using System.Net.Mail;

namespace API.Controllers
{
    
    // Define model for audit history change email
    public class AuditChangeModel
    {
        public required string Name { get; set; } = string.Empty; // Name of the recipient
        public required string ToEmail { get; set; } = string.Empty; // Email address of the recipient
        public required AuditHistory ChangedAudit { get; set; } // Changed Audit
    }

    // Controller for handling email-related operations
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        // Sender's email address and key
        public string FromEmail = "priyanshukoley0@gmail.com";
        public string Key = "oinq humj srsb kqry";

        // Company name used in email templates
        public string CompanyName = "Promact Infotech Pvt Ltd";

        // Endpoint for sending audit updation email
        [HttpPost("AuditChange")]
        public ActionResult AuditChange(AuditChangeModel emailData)
        {
            var Subject = $"Change in audit history";

            // Construct the email message
            var message = new MailMessage()
            {
                From = new MailAddress(FromEmail), // Sender email address
                Subject = Subject, // Email subject
                IsBodyHtml = true, // Flag to set body to HTML
                // Email body
                Body = $"""
                <html>
                    <body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px 0px;">
                        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <p>Hello {emailData.Name},</p>
                            <h1 style="color: #333;">Please note that audit has been completed and here is the audit summary:</h1>
                            <p style="color: #555;">On {emailData.ChangedAudit.AuditDate} Mr/Mrs. {emailData.ChangedAudit.ReviewedBy} reviewed "{emailData.ChangedAudit.ReviewedSection}" and had commented "{emailData.ChangedAudit.Comment}".</p>
                            <p style="color: #555;">The status of the project is: {emailData.ChangedAudit.Status}.</p>
                            <p style="color: #555;">The action items are: {emailData.ChangedAudit.ActionItem}.</p>
                            <p style="color: #555;">Please click the button bellow to view the details.</p>
                            <a href="http://localhost:4200/details/{emailData.ChangedAudit.ProjectId}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">View details</a>
                            <p style="color: #555;">Thanks and Regards,<br>{CompanyName}</p>
                        </div>
                    </body>
                </html>
                """,
            };

            // Add recipient's email address
            message.To.Add(new MailAddress(emailData.ToEmail));

            // Create new SMTP client
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                // Using google SMTP server
                Port = 587,
                Credentials = new NetworkCredential(FromEmail, Key),
                EnableSsl = true,
            };
            // Sent Email
            smtp.Send(message);

            // Return success message
            return Ok("Audit update Email Sent");
        }

    }
}