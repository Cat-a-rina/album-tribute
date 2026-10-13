import { notFound } from "next/navigation";
import { DesignSystemPage } from "@/components/ds/DesignSystemPage";
import { designSystems, getDesignSystem } from "@/lib/design-systems";

export const dynamicParams = false;

export function generateStaticParams() {
  return designSystems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = getDesignSystem(slug);
  return { title: system ? `${system.name} design system` : "Design system" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = getDesignSystem(slug);
  if (!system) notFound();
  return <DesignSystemPage system={system} />;
}
