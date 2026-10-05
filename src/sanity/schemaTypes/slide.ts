import { defineType, defineField } from "sanity";

export const slideType = defineType({
  name: "slide",
  title: "Banner / Slide Hero",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título de Impacto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Chamada",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tag / Selo (ex: LANÇAMENTO EXCLUSIVO)",
      type: "string",
    }),
    defineField({
      name: "brand",
      title: "Marca Relacionada",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "image",
      title: "Foto Principal do Slide",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Cor do Gradiente / Brilho Liquid",
      type: "string",
      description: "Ex: from-amber-500/30 to-orange-600/30",
    }),
    defineField({
      name: "ctaText",
      title: "Texto do Botão",
      type: "string",
      initialValue: "Conferir Oferta",
    }),
    defineField({
      name: "ctaLink",
      title: "Link do Botão",
      type: "string",
      initialValue: "#catalogo",
    }),
    defineField({
      name: "gradientTheme",
      title: "Gradiente do Overlay (Tailwind)",
      type: "string",
      description:
        "Classes Tailwind do gradiente hero. Ex: from-amber-600/40 via-orange-600/30 to-emerald-900/40",
    }),
    defineField({
      name: "priceNote",
      title: "Nota de Preço / Destaque",
      type: "string",
      description: "Ex: A partir de R$ 189,90",
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      initialValue: 0,
    }),
  ],
});
