export type PageParams = Record<string, string | string[]>;

export interface PageProps {
  params?: PageParams;
  searchParams?: Record<string, string | string[]>;
}