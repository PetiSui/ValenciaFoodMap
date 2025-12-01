
import { EmailTemplate } from '@/app/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {
    console.log('Request received', request);
    
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <petisui123@gmail.com>',
      to: ['petiputo0@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ nombre: 'John', asunto: 'Test', mensaje: 'This is a test email.' })
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}