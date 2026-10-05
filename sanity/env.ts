export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder-id" &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id-here";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
