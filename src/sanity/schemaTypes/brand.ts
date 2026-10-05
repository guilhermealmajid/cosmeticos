import { defineType, defineField } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Marca",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da Marca",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slogan",
      title: "Slogan / Frase de Efeito",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Cor de Destaque (Hex)",
      type: "string",
      description: "Ex: #EA580C para Natura, #E11D48 para Avon, #7C3AED para Jequiti",
    }),
    defineField({
      name: "logo",
      title: "Logo da Marca",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "catalogUrl",
      title: "Link da Revista Digital / Catálogo Online",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Descrição da Marca",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "gradient",
      title: "Gradiente Tailwind (Classes)",
      type: "string",
      description:
        "Ex: from-amber-500/20 via-orange-500/20 to-emerald-600/20",
    }),
  ],
});
