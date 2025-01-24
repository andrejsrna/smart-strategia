import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { formSchema } from '@/lib/validations/form';
import rateLimit from '@/lib/rate-limit'; 

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(5, 'CACHE_TOKEN'); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Validácia dát
    const data = await request.json();
    const validatedData = formSchema.parse(data);
    
    const formatCurrency = (value: number | undefined) => {
      if (!value) return '0 €';
      return `${value.toLocaleString('sk-SK')} €`;
    };

    const emailContent = `
      <h2>Nový záznam aktivity</h2>
      
      <h3>Základné informácie</h3>
      <p><strong>Rok:</strong> ${validatedData.rok}</p>
      <p><strong>Obec:</strong> ${validatedData.obec}</p>
      <p><strong>Okres:</strong> ${validatedData.okres}</p>
      <p><strong>Aktivita ukončená:</strong> ${validatedData.ukoncena === 'ano' ? 'Áno' : 'Nie'}</p>
      
      <h3>Detaily aktivity</h3>
      <p><strong>Názov aktivity:</strong> ${validatedData.nazovAktivity}</p>
      <p><strong>Priorita podľa PHRSR:</strong> ${validatedData.prioritaPHRSR}</p>
      
      <h3>Merateľný ukazovateľ</h3>
      <p><strong>Názov:</strong> ${validatedData.nazovUkazovatela}</p>
      <p><strong>Jednotka:</strong> ${validatedData.jednotkaUkazovatela}</p>
      <p><strong>Hodnota:</strong> ${validatedData.hodnotaUkazovatela}</p>
      
      <h3>Financovanie</h3>
      <p><strong>Celková prefinancovaná čiastka:</strong> ${formatCurrency(validatedData.prefinancovanaCiastka)}</p>
      
      <h4>Zdroje financovania:</h4>
      <p><strong>Operačný program:</strong> ${validatedData.operacnyProgram || 'Neuvedené'}</p>
      <ul>
        <li><strong>Mechanizmus:</strong> ${formatCurrency(validatedData.mechanizmus)}</li>
        <li><strong>Nadácia:</strong> ${formatCurrency(validatedData.nadacia)}</li>
        <li><strong>Fond/Grant:</strong> ${formatCurrency(validatedData.fondGrant)}</li>
        <li><strong>Agentúra:</strong> ${formatCurrency(validatedData.agentura)}</li>
        <li><strong>Vlastné zdroje:</strong> ${formatCurrency(validatedData.vlastneZdroje)}</li>
        <li><strong>Iné:</strong> ${formatCurrency(validatedData.ineZdroje)}</li>
      </ul>
      ${validatedData.ineFinancovanieNazov ? `<p><strong>Iné financovanie:</strong> ${validatedData.ineFinancovanieNazov}</p>` : ''}
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'trnka.andrej@trnava-vuc.sk',
      subject: `Nový záznam aktivity - ${validatedData.obec}`,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error:', error);
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError' && 'errors' in error) {
      return NextResponse.json(
        { error: 'Neplatné dáta', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 