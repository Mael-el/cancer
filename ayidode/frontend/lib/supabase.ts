import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Appel sécurisé des Edge Functions Supabase
 */
export async function invokeEdgeFunction<T = any>(functionName: string, body: Record<string, any>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (error) {
    throw new Error(error.message || `Erreur Edge Function [${functionName}]`);
  }

  return data as T;
}

/**
 * Validation numéro Bénin (+229 01XXXXXXXX ou 8 à 10 chiffres après 229)
 */
export function validateBeninPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  // Format international +229 ou national 01xxxxxxxx / 9xxxxxxxx / 6xxxxxxxx
  const regex = /^(\+229|00229)?[0-9]{8,10}$/;
  return regex.test(cleaned);
}
