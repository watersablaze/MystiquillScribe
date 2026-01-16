import SiteShell from '@ui/SiteShell';

export default function ScribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell mode="scribe">{children}</SiteShell>;
}