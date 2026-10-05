import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    // Se o webhook tiver um segredo configurado, valida a assinatura criptográfica
    if (secret) {
      const { isValidSignature, body } = await parseBody<{
        _type?: string;
        slug?: { current?: string };
      }>(req, secret);

      if (!isValidSignature) {
        return new NextResponse("Assinatura do webhook inválida.", { status: 401 });
      }

      // Revalida a página inicial e todas as rotas filhas
      revalidatePath("/", "layout");

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        documentType: body?._type || "unknown",
      });
    }

    // Se nenhum secret estiver configurado, processa a revalidação diretamente
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      warning: "SANITY_REVALIDATE_SECRET não definido; requisição aceita sem validação de assinatura.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro ao revalidar cache:", message);
    return new NextResponse(message, { status: 500 });
  }
}

// Suporte a GET para permitir testes manuais no navegador (ex: /api/revalidate?secret=MEU_SEGREDO)
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const token = req.nextUrl.searchParams.get("secret");

  if (secret && token !== secret) {
    return new NextResponse("Não autorizado.", { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: "Cache da aplicação revalidado com sucesso manualmente!",
  });
}
