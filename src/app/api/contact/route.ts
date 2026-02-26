import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, phone, email, service, message, source } = data;

        // Ensure we have the minimum required fields
        if (!name || (!phone && !email) || !message) {
            return NextResponse.json(
                { error: 'Name, message, and either phone or email are required.' },
                { status: 400 }
            );
        }

        // Configure the Nodemailer transporter using Hostinger SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Construct the email content
        const mailOptions = {
            from: `"${name} (Website Form)" <${process.env.SMTP_USER}>`, // Send *from* the authenticated user to avoid spam blocks
            replyTo: email || undefined,
            to: process.env.SMTP_USER, // Receive it at the same address, or change to a different destination
            subject: `New Request for Quote - ${service || 'General Inquiry'}`,
            html: `
                <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #004785; border-bottom: 2px solid #ff8c00; padding-bottom: 5px;">New Quote Request from Website</h2>
                    <p><strong>Source:</strong> ${source || 'Website Contact Form'}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                    <p><strong>Interested Service:</strong> ${service || 'None specified'}</p>
                    
                    <h3 style="color: #004785; margin-top: 20px;">Message:</h3>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff8c00; white-space: pre-wrap;">
                        ${message}
                    </div>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send the email. Please try again later.' },
            { status: 500 }
        );
    }
}
