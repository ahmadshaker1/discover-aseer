import IdentityFilesHero from "@/components/identityfiles/hero";
import IdentityCard from "@/components/identityfiles/identity-card";
import { parseCatalogPage } from "@/lib/directus/collectionCache";

interface AseerIdentityPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AseerIdentityPage({
  searchParams,
}: AseerIdentityPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);

  return (
    <div className="flex w-full flex-col">
      <IdentityFilesHero />
      <IdentityCard page={page} />
    </div>
  );
}
