import { defineType, defineField } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da Categoria",
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
      name: "iconName",
      title: "Ícone Representativo (Lucide Icon)",
      type: "string",
      description: "Ex: Sparkles, Flower2, Heart, Droplets, Gift",
    }),
  ],
});
