import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./sendGrid";
import * as z from "zod";

// Contact form validation schema for the server
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form email sending endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request data
      const formData = contactFormSchema.parse(req.body);
      
      // Check if SendGrid API key is set
      if (!process.env.SENDGRID_API_KEY) {
        console.warn("SendGrid API key is not set. Email functionality is disabled.");
        return res.status(503).json({ 
          success: false, 
          message: "Email service is not configured" 
        });
      }
      
      // Prepare the email content
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `;
      
      // Send the email
      const emailSent = await sendEmail({
        to: "mdhossain2437@gmail.com", // The recipient's email
        from: "no-reply@mddelowar.dev", // The verified sender email
        subject: `Portfolio Contact: ${formData.subject}`,
        html: emailContent,
        replyTo: formData.email // Set reply-to as the sender's email
      });
      
      if (emailSent) {
        res.status(200).json({ 
          success: true, 
          message: "Your message has been sent successfully!" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send email. Please try again later." 
        });
      }
      
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      // Handle general errors
      res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred. Please try again." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
