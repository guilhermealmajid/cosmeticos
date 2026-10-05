import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const imageBuilder = imageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: unknown) => {
  if (!source) return null;
  return imageBuilder?.image(source as Parameters<typeof imageBuilder.image>[0]).auto("format").fit("max");
};
