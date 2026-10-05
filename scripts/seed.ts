import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l2j6hjuh";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";
const token = process.env.SANITY_API_TOKEN;

if (!token || token === "seu_token_aqui") {
  console.error("❌ Erro: SANITY_API_TOKEN não configurado no .env.local");
  console.error("👉 Obtenha um token com permissão de escrita em https://manage.sanity.io");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function seed() {
  console.log("🚀 Iniciando seed do Sanity CMS...");

  // 1. Marcas (Brands)
  const brands = [
    {
      _id: "brand-natura",
      _type: "brand",
      name: "Natura",
      slug: { _type: "slug", current: "natura" },
      slogan: "Viva a sua beleza viva",
      accentColor: "#EA580C",
      gradient: "from-amber-500/20 via-orange-500/20 to-emerald-600/20",
      catalogUrl: "https://www.natura.com.br/revista",
      description: "Cosméticos com ativos da biodiversidade brasileira, veganos e sustentáveis.",
    },
    {
      _id: "brand-avon",
      _type: "brand",
      name: "Avon",
      slug: { _type: "slug", current: "avon" },
      slogan: "Olha de novo",
      accentColor: "#E11D48",
      gradient: "from-rose-500/20 via-pink-500/20 to-fuchsia-600/20",
      catalogUrl: "https://www.avon.com.br/folheto-digital",
      description: "Inovação tecnológica em skincare, maquiagens icônicas e alta perfumaria.",
    },
    {
      _id: "brand-jequiti",
      _type: "brand",
      name: "Jequiti",
      slug: { _type: "slug", current: "jequiti" },
      slogan: "Sonha que dá",
      accentColor: "#7C3AED",
      gradient: "from-purple-500/20 via-indigo-500/20 to-violet-600/20",
      catalogUrl: "https://www.jequiti.com.br/revistas",
      description: "Fragrâncias consagradas dos maiores astros e artistas da TV brasileira.",
    },
  ];

  for (const brand of brands) {
    await client.createOrReplace(brand);
    console.log(`  ✓ Marca inserida: ${brand.name}`);
  }

  // 2. Categorias (Categories)
  const categories = [
    { _id: "cat-perfumes", _type: "category", name: "Perfumes", slug: { _type: "slug", current: "perfumes" }, iconName: "Sparkles" },
    { _id: "cat-corpo", _type: "category", name: "Corpo & Banho", slug: { _type: "slug", current: "corpo-banho" }, iconName: "Droplets" },
    { _id: "cat-skincare", _type: "category", name: "Rosto & Skincare", slug: { _type: "slug", current: "rosto-skincare" }, iconName: "Heart" },
    { _id: "cat-maquiagem", _type: "category", name: "Maquiagem", slug: { _type: "slug", current: "maquiagem" }, iconName: "Palette" },
    { _id: "cat-presentes", _type: "category", name: "Presentes & Kits", slug: { _type: "slug", current: "presentes-kits" }, iconName: "Gift" },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`  ✓ Categoria inserida: ${cat.name}`);
  }

  // 3. Slides Hero
  const slides = [
    {
      _id: "slide-1",
      _type: "slide",
      title: "Essencial Exclusivo",
      subtitle: "A nobreza das madeiras brasileiras e especiarias quentes",
      tagline: "LANÇAMENTO NATURA",
      brand: { _type: "reference", _ref: "brand-natura" },
      gradientTheme: "from-amber-600/40 via-orange-600/30 to-emerald-900/40",
      accentColor: "#EA580C",
      ctaText: "Ver Linha Natura",
      ctaLink: "#catalogo",
      priceNote: "A partir de R$ 189,90",
      order: 0,
    },
    {
      _id: "slide-2",
      _type: "slide",
      title: "Far Away Glamour",
      subtitle: "A sofisticação do cassis, flor de laranjeira e baunilha de Madagascar",
      tagline: "DESTAQUE AVON",
      brand: { _type: "reference", _ref: "brand-avon" },
      gradientTheme: "from-rose-600/40 via-pink-600/30 to-fuchsia-950/40",
      accentColor: "#E11D48",
      ctaText: "Explorar Avon",
      ctaLink: "#catalogo",
      priceNote: "Edição Especial R$ 99,90",
      order: 1,
    },
    {
      _id: "slide-3",
      _type: "slide",
      title: "Fábio Jr. & Claudia Leitte",
      subtitle: "Fragrâncias assinadas que traduzem carisma, presença e elegância",
      tagline: "SUCESSO JEQUITI",
      brand: { _type: "reference", _ref: "brand-jequiti" },
      gradientTheme: "from-purple-600/40 via-violet-600/30 to-indigo-950/40",
      accentColor: "#7C3AED",
      ctaText: "Descobrir Jequiti",
      ctaLink: "#catalogo",
      priceNote: "Fragrâncias a partir de R$ 79,90",
      order: 2,
    },
  ];

  for (const slide of slides) {
    await client.createOrReplace(slide);
    console.log(`  ✓ Slide inserido: ${slide.title}`);
  }

  // 4. Produtos (Products)
  const products: any[] = [
    {
      _id: "prod-natura-1",
      _type: "product",
      title: "Essencial Exclusivo Deo Parfum Masculino",
      slug: { _type: "slug", current: "essencial-exclusivo-deo-parfum" },
      brand: { _type: "reference", _ref: "brand-natura" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 249.90,
      salePrice: 199.90,
      description: "Uma fragrância amadeirada intensa que combina a copaíba, preciosa madeira da biodiversidade brasileira, com um coração de especiarias nobres. Feito para momentos memoráveis.",
      olfactoryNotes: "Amadeirado Intenso • Copaíba, Pimenta Rosa e Noz Moscada",
      volume: "100ml",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-natura-2",
      _type: "product",
      title: "Kaiak Aventura Desodorante Colônia",
      slug: { _type: "slug", current: "kaiak-aventura-colonia" },
      brand: { _type: "reference", _ref: "brand-natura" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 172.90,
      salePrice: 139.90,
      description: "A energia das notas cítricas com o frescor das notas aquosas, potencializadas por notas verdes e aromáticas.",
      olfactoryNotes: "Aromático Aquoso Moderado • Bergamota, Mandarina, Musgo",
      volume: "100ml",
      inStock: true,
      isFeatured: false,
    },
    {
      _id: "prod-natura-3",
      _type: "product",
      title: "Creme Desodorante Nutritivo Tododia Algodão",
      slug: { _type: "slug", current: "creme-tododia-algodao" },
      brand: { _type: "reference", _ref: "brand-natura" },
      category: { _type: "reference", _ref: "cat-corpo" },
      price: 76.90,
      salePrice: 59.90,
      description: "Nutrição prebiótica que se adapta ao que sua pele precisa a cada momento. Textura cremosa, fácil de espalhar e secagem rápida com fragrância suave e confortável.",
      olfactoryNotes: "Floral Delicado • Flor de Algodão, Baunilha Suave",
      volume: "400ml",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-natura-4",
      _type: "product",
      title: "Chronos Sérum Intensivo Pró-Firmeza",
      slug: { _type: "slug", current: "chronos-serum-pro-firmeza" },
      brand: { _type: "reference", _ref: "brand-natura" },
      category: { _type: "reference", _ref: "cat-skincare" },
      price: 189.90,
      description: "Tratamento intensivo que restaura a firmeza da pele, suaviza rugas profundas e remodela o contorno facial com extrato de jataí e bio-peptídeos.",
      olfactoryNotes: "Ativos Bio-Peptídeos + Extrato de Jataí",
      volume: "30ml",
      inStock: true,
      isFeatured: false,
    },
    {
      _id: "prod-avon-1",
      _type: "product",
      title: "Far Away Glamour Deo Parfum",
      slug: { _type: "slug", current: "far-away-glamour-deo-parfum" },
      brand: { _type: "reference", _ref: "brand-avon" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 119.90,
      salePrice: 89.90,
      description: "Sinta o glamour com uma combinação inebriante de cassis brilhante, flor de laranjeira radiante e a sofisticada baunilha de Madagascar.",
      olfactoryNotes: "Adocicado Floral • Cassis, Flor de Laranjeira, Baunilha Negra",
      volume: "50ml",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-avon-2",
      _type: "product",
      title: "Batom Ultra Matte FPS 15 Vermelho Puro",
      slug: { _type: "slug", current: "batom-ultra-matte-vermelho" },
      brand: { _type: "reference", _ref: "brand-avon" },
      category: { _type: "reference", _ref: "cat-maquiagem" },
      price: 36.90,
      salePrice: 28.90,
      description: "O batom matte número 1 do Brasil. Acabamento 100% matte com toque aveludado e confortável, sem ressecar os lábios.",
      olfactoryNotes: "Enriquecido com Óleo de Abacate e Vitamina E",
      volume: "3.6g",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-avon-3",
      _type: "product",
      title: "Renew Vitamina C Super Concentrado Antioxidante",
      slug: { _type: "slug", current: "renew-vitamina-c-antioxidante" },
      brand: { _type: "reference", _ref: "brand-avon" },
      category: { _type: "reference", _ref: "cat-skincare" },
      price: 139.90,
      salePrice: 109.90,
      description: "Concentrado de alta potência com 10% de Vitamina C pura, estável da primeira à última gota. Uniformiza o tom da pele e combate radicais livres.",
      olfactoryNotes: "10% Vitamina C Pura Estabilizada",
      volume: "30ml",
      inStock: true,
      isFeatured: false,
    },
    {
      _id: "prod-avon-4",
      _type: "product",
      title: "Kit Especial Presente Encanto Irresistível",
      slug: { _type: "slug", current: "kit-presente-encanto-irresistivel" },
      brand: { _type: "reference", _ref: "brand-avon" },
      category: { _type: "reference", _ref: "cat-presentes" },
      price: 94.90,
      salePrice: 79.90,
      description: "Acompanha Loção Hidratante Corporal 400ml + Creme para Mãos 75g + Caixa Exclusiva presenteável. Fragrância envolvente de Flor de Algodão.",
      olfactoryNotes: "Notas Florais Marcantes e Manteiga de Karité",
      volume: "Kit com 2 itens + Caixa",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-jequiti-1",
      _type: "product",
      title: "Fábio Jr. Colônia Masculina Desodorante",
      slug: { _type: "slug", current: "fabio-jr-colonia-masculina" },
      brand: { _type: "reference", _ref: "brand-jequiti" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 129.90,
      salePrice: 99.90,
      description: "Clássico romântico que conquista gerações. Combina o frescor cítrico inicial com um fundo aromático amadeirado viril e inesquecível.",
      olfactoryNotes: "Madeira Sensual • Cardamomo, Cedro e Âmbar",
      volume: "100ml",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-jequiti-2",
      _type: "product",
      title: "Claudia Leitte Euforia Desodorante Colônia",
      slug: { _type: "slug", current: "claudia-leitte-euforia" },
      brand: { _type: "reference", _ref: "brand-jequiti" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 139.90,
      salePrice: 109.90,
      description: "A vibração e brilho contagiante de Claudia Leitte em notas florais radiantes e frutas vermelhas tropicais com fundo cremoso de sândalo.",
      olfactoryNotes: "Floral Frutal Vibrante • Frutas Vermelhas, Jasmim e Âmbar",
      volume: "100ml",
      inStock: true,
      isFeatured: true,
    },
    {
      _id: "prod-jequiti-3",
      _type: "product",
      title: "Patricia Abravanel Essence Deo Colônia",
      slug: { _type: "slug", current: "patricia-abravanel-essence" },
      brand: { _type: "reference", _ref: "brand-jequiti" },
      category: { _type: "reference", _ref: "cat-perfumes" },
      price: 124.90,
      salePrice: 94.90,
      description: "Elegante e alegre, perfeita para mulheres espontâneas. Acordes florais luminosos com toques frutados e sândalo cremoso.",
      olfactoryNotes: "Floral Oriental • Frutas Exóticas, Baunilha e Almíscar",
      volume: "100ml",
      inStock: true,
      isFeatured: false,
    },
    {
      _id: "prod-jequiti-4",
      _type: "product",
      title: "Sensi Sabonetes em Barra Sortidos (5 unidades)",
      slug: { _type: "slug", current: "sensi-sabonetes-barra-sortidos" },
      brand: { _type: "reference", _ref: "brand-jequiti" },
      category: { _type: "reference", _ref: "cat-corpo" },
      price: 34.90,
      salePrice: 27.90,
      description: "Fórmula 100% vegetal com espuma abundante e hidratante. Caixa com 5 barras aromáticas exclusivas.",
      olfactoryNotes: "Mix de Leite de Amêndoas, Aveia e Óleos Essenciais",
      volume: "5 x 90g (450g)",
      inStock: true,
      isFeatured: false,
    },
  ];

  for (const prod of products) {
    await client.createOrReplace(prod);
    console.log(`  ✓ Produto inserido: ${prod.title}`);
  }

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log("📌 Lembre-se de adicionar as imagens aos produtos e slides no Sanity Studio (/studio).");
}

seed().catch((err) => {
  console.error("❌ Erro durante o seed:", err);
  process.exit(1);
});
