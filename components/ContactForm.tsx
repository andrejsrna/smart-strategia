'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormData } from '@/lib/validations/form';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rok: new Date().getFullYear(),
      ukoncena: 'ano',
      gdprSuhlas: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Pridáme CSRF token ak ho používate
          // 'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Odoslanie zlyhalo');
      }

      reset({
        rok: new Date().getFullYear(),
        ukoncena: 'ano',
        gdprSuhlas: false,
      });
      
      alert('Formulár bol úspešne odoslaný');
    } catch (error) {
      console.error('Chyba pri odosielaní:', error);
      setError('root', {
        type: 'server',
        message: 'Nastala chyba pri odosielaní formulára. Skúste to prosím znova.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="rok" className="block text-sm font-medium text-gray-700">
            Rok
          </label>
          <input
            type="number"
            id="rok"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.rok ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('rok', { valueAsNumber: true })}
          />
          {errors.rok && (
            <p className="mt-1 text-sm text-red-600">{errors.rok.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="obec" className="block text-sm font-medium text-gray-700">
            Obec
          </label>
          <input
            type="text"
            id="obec"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.obec ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('obec')}
          />
          {errors.obec && (
            <p className="mt-1 text-sm text-red-600">{errors.obec.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="okres" className="block text-sm font-medium text-gray-700">
            Okres
          </label>
          <input
            type="text"
            id="okres"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.okres ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('okres')}
          />
          {errors.okres && (
            <p className="mt-1 text-sm text-red-600">{errors.okres.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="ukoncena" className="block text-sm font-medium text-gray-700">
            Ukončená
          </label>
          <select
            id="ukoncena"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.ukoncena ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('ukoncena')}
          >
            <option value="ano">Áno</option>
            <option value="nie">Nie</option>
          </select>
          {errors.ukoncena && (
            <p className="mt-1 text-sm text-red-600">{errors.ukoncena.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nazovAktivity" className="block text-sm font-medium text-gray-700">
          Názov zrealizovanej aktivity
        </label>
        <textarea
          id="nazovAktivity"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.nazovAktivity ? 'border-red-300' : 'border-gray-300'
          }`}
          {...register('nazovAktivity')}
        />
        {errors.nazovAktivity && (
          <p className="mt-1 text-sm text-red-600">{errors.nazovAktivity.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="prioritaPHRSR" className="block text-sm font-medium text-gray-700">
          Priorita podľa PHRSR
        </label>
        <input
          type="text"
          id="prioritaPHRSR"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.prioritaPHRSR ? 'border-red-300' : 'border-gray-300'
          }`}
          {...register('prioritaPHRSR')}
        />
        {errors.prioritaPHRSR && (
          <p className="mt-1 text-sm text-red-600">{errors.prioritaPHRSR.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nazovUkazovatela" className="block text-sm font-medium text-gray-700">
          Názov merateľného ukazovateľa
        </label>
        <input
          type="text"
          id="nazovUkazovatela"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.nazovUkazovatela ? 'border-red-300' : 'border-gray-300'
          }`}
          {...register('nazovUkazovatela')}
        />
        {errors.nazovUkazovatela && (
          <p className="mt-1 text-sm text-red-600">{errors.nazovUkazovatela.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="jednotkaUkazovatela" className="block text-sm font-medium text-gray-700">
            Jednotka merateľného ukazovateľa
          </label>
          <input
            type="text"
            id="jednotkaUkazovatela"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.jednotkaUkazovatela ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('jednotkaUkazovatela')}
          />
          {errors.jednotkaUkazovatela && (
            <p className="mt-1 text-sm text-red-600">{errors.jednotkaUkazovatela.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="hodnotaUkazovatela" className="block text-sm font-medium text-gray-700">
            Hodnota merateľného ukazovateľa
          </label>
          <input
            type="text"
            id="hodnotaUkazovatela"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.hodnotaUkazovatela ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('hodnotaUkazovatela')}
          />
          {errors.hodnotaUkazovatela && (
            <p className="mt-1 text-sm text-red-600">{errors.hodnotaUkazovatela.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="prefinancovanaCiastka" className="block text-sm font-medium text-gray-700">
          Prefinancovaná čiastka (EUR)
        </label>
        <input
          type="number"
          id="prefinancovanaCiastka"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.prefinancovanaCiastka ? 'border-red-300' : 'border-gray-300'
          }`}
          {...register('prefinancovanaCiastka', { valueAsNumber: true })}
        />
        {errors.prefinancovanaCiastka && (
          <p className="mt-1 text-sm text-red-600">{errors.prefinancovanaCiastka.message}</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Zdroj financovania</h3>
        
        <div className="mb-6">
          <label htmlFor="operacnyProgram" className="block text-sm font-medium text-gray-700">
            Operačný program (Názov)
          </label>
          <input
            type="text"
            id="operacnyProgram"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.operacnyProgram ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('operacnyProgram')}
          />
          {errors.operacnyProgram && (
            <p className="mt-1 text-sm text-red-600">{errors.operacnyProgram.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="mechanizmus" className="block text-sm font-medium text-gray-700">
              Mechanizmus (EUR)
            </label>
            <input
              type="number"
              id="mechanizmus"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.mechanizmus ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('mechanizmus', { valueAsNumber: true })}
            />
            {errors.mechanizmus && (
              <p className="mt-1 text-sm text-red-600">{errors.mechanizmus.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nadacia" className="block text-sm font-medium text-gray-700">
              Nadácia (EUR)
            </label>
            <input
              type="number"
              id="nadacia"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.nadacia ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('nadacia', { valueAsNumber: true })}
            />
            {errors.nadacia && (
              <p className="mt-1 text-sm text-red-600">{errors.nadacia.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="fondGrant" className="block text-sm font-medium text-gray-700">
              Fond/Grant (EUR)
            </label>
            <input
              type="number"
              id="fondGrant"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.fondGrant ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('fondGrant', { valueAsNumber: true })}
            />
            {errors.fondGrant && (
              <p className="mt-1 text-sm text-red-600">{errors.fondGrant.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="agentura" className="block text-sm font-medium text-gray-700">
              Agentúra (EUR)
            </label>
            <input
              type="number"
              id="agentura"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.agentura ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('agentura', { valueAsNumber: true })}
            />
            {errors.agentura && (
              <p className="mt-1 text-sm text-red-600">{errors.agentura.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="vlastneZdroje" className="block text-sm font-medium text-gray-700">
              Vlastné zdroje (EUR)
            </label>
            <input
              type="number"
              id="vlastneZdroje"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.vlastneZdroje ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('vlastneZdroje', { valueAsNumber: true })}
            />
            {errors.vlastneZdroje && (
              <p className="mt-1 text-sm text-red-600">{errors.vlastneZdroje.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="ineZdroje" className="block text-sm font-medium text-gray-700">
              Iné (EUR)
            </label>
            <input
              type="number"
              id="ineZdroje"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.ineZdroje ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register('ineZdroje', { valueAsNumber: true })}
            />
            {errors.ineZdroje && (
              <p className="mt-1 text-sm text-red-600">{errors.ineZdroje.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="ineFinancovanieNazov" className="block text-sm font-medium text-gray-700">
            Iné financovanie (Názov)
          </label>
          <input
            type="text"
            id="ineFinancovanieNazov"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.ineFinancovanieNazov ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('ineFinancovanieNazov')}
          />
          {errors.ineFinancovanieNazov && (
            <p className="mt-1 text-sm text-red-600">{errors.ineFinancovanieNazov.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="gdprSuhlas"
              {...register('gdprSuhlas')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="gdprSuhlas" className="font-medium text-gray-700">
              Súhlasím so spracovaním osobných údajov
            </label>
            <p className="text-gray-500">
              Prečítajte si{' '}
              <a
                href="https://trnava-vuc.sk/oboznamenie-k-spracuvaniu-osobnych-udajov-trnavskym-samospravnym-krajom/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                oboznámenie k spracúvaniu osobných údajov Trnavským samosprávnym krajom
              </a>
            </p>
          </div>
        </div>
      </div>

      {errors.root && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {errors.root.message}
              </h3>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Odosielam...' : 'Odoslať údaje'}
      </button>
    </form>
  );
} 