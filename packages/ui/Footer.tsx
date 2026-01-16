export default function Footer() {
  return (
    <footer className="border-t border-silver/20">
      <div className="mx-auto max-w-5xl px-6 py-8 text-xs opacity-80">
        <div>© {new Date().getFullYear()} Mystiquill — “I build rituals in pixels and poems in motion.”</div>
      </div>
    </footer>
  );
}