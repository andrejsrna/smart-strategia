import { z } from 'zod';

export const formSchema = z.object({
  rok: z.number()
    .min(2000, 'Rok musí byť minimálne 2000')
    .max(new Date().getFullYear(), 'Rok nemôže byť v budúcnosti'),
  
  obec: z.string()
    .min(2, 'Názov obce musí mať aspoň 2 znaky')
    .max(100, 'Názov obce je príliš dlhý')
    .regex(/^[a-zA-ZáäčďéěíľĺňóôŕřšťúůýžÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ\s-]+$/, 'Názov obce obsahuje nepovolené znaky'),
  
  okres: z.string()
    .min(2, 'Názov okresu musí mať aspoň 2 znaky')
    .max(100, 'Názov okresu je príliš dlhý')
    .regex(/^[a-zA-ZáäčďéěíľĺňóôŕřšťúůýžÁÄČĎÉĚÍĽĹŇÓÔŔŘŠŤÚŮÝŽ\s-]+$/, 'Názov okresu obsahuje nepovolené znaky'),
  
  nazovAktivity: z.string()
    .min(10, 'Názov aktivity musí mať aspoň 10 znakov')
    .max(500, 'Názov aktivity je príliš dlhý'),
  
  ukoncena: z.enum(['ano', 'nie']),
  
  prioritaPHRSR: z.string()
    .min(1, 'Priorita je povinná')
    .max(200, 'Priorita je príliš dlhá'),
  
  nazovUkazovatela: z.string()
    .min(3, 'Názov ukazovateľa musí mať aspoň 3 znaky')
    .max(200, 'Názov ukazovateľa je príliš dlhý'),
  
  jednotkaUkazovatela: z.string()
    .min(1, 'Jednotka je povinná')
    .max(20, 'Jednotka je príliš dlhá'),
  
  hodnotaUkazovatela: z.string()
    .min(1, 'Hodnota je povinná'),
  
  prefinancovanaCiastka: z.number()
    .min(0, 'Čiastka nemôže byť záporná')
    .max(1000000000, 'Čiastka je príliš vysoká'),
  
  operacnyProgram: z.string().optional(),
  
  mechanizmus: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  nadacia: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  fondGrant: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  agentura: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  vlastneZdroje: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  ineZdroje: z.number()
    .min(0, 'Hodnota nemôže byť záporná')
    .optional(),
  
  ineFinancovanieNazov: z.string().optional(),
  
  gdprSuhlas: z.boolean({
    required_error: 'Musíte súhlasiť so spracovaním osobných údajov',
  }).refine((val) => val === true, 'Musíte súhlasiť so spracovaním osobných údajov'),
}).refine((data) => {
  const total = (data.mechanizmus || 0) +
    (data.nadacia || 0) +
    (data.fondGrant || 0) +
    (data.agentura || 0) +
    (data.vlastneZdroje || 0) +
    (data.ineZdroje || 0);
  
  return total === Number(data.prefinancovanaCiastka);
}, {
  message: 'Súčet všetkých zdrojov financovania musí byť rovný celkovej prefinancovanej čiastke',
  path: ['prefinancovanaCiastka'],
});

export type FormData = z.infer<typeof formSchema>; 