import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do Produto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Preço Regular (R$)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "Preço Promocional (R$)",
      type: "number",
      description: "Deixe em branco se não estiver em promoção",
    }),
    defineField({
      name: "images",
      title: "Imagens do Produto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "description",
      title: "Descrição Completa",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "olfactoryNotes",
      title: "Notas Olfativas / Principais Ativos",
      type: "string",
      description: "Ex: Floral Amadeirado, Flor de Lis, Ácido Hialurônico Puro",
    }),
    defineField({
      name: "volume",
      title: "Volume / Peso",
      type: "string",
      description: "Ex: 100ml, 400ml, 3.6g",
    }),
    defineField({
      name: "inStock",
      title: "Pronta Entrega",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Destaque na Vitrine Principal",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
