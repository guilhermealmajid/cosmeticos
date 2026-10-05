import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

// Usa um projectId placeholder válido (só letras/números/dashes) quando não configurado
const safeProjectId = isSanityConfigured ? projectId : "placeholder-id";

export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  // useCdn: false garante que ao revalidar (via webhook) os dados venham frescos da API imediatamente
  useCdn: false,
});

export { isSanityConfigured };
