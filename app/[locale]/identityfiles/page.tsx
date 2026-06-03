import IdentityFilesHero from "@/components/identityfiles/hero";
import IdentityCard from "@/components/identityfiles/identity-card";
export default function AseerIdentityPage() {
  return (
    <div className="flex w-full flex-col">
      <IdentityFilesHero />
      <IdentityCard />
    </div>
  );
}
