export default function Footer() {
  return (
    <footer className="bg-black py-28 text-white">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-2xl font-extrabold">TAAG</div>
          <p className="mt-4 text-sm text-white/60">
            Advanced molecular intelligence for global industry.
          </p>
        </div>
        <div className="text-sm text-white/70">
          <div className="font-semibold mb-3">Navigation</div>
          <div className="space-y-2">
            <a className="block hover:text-white" href="#industrial">Industrial Microbiology</a>
            <a className="block hover:text-white" href="#custom">Customized Molecular</a>
            <a className="block hover:text-white" href="#digital">Digital Transformation</a>
            <a className="block hover:text-white" href="#hubs">Hubs</a>
          </div>
        </div>
        <div className="text-sm text-white/70">
          <div className="font-semibold mb-3">Legal</div>
          <div className="space-y-2">
            <div>ISO / IEC 17025</div>
            <div>Privacy</div>
            <div>LinkedIn</div>
          </div>
        </div>
      </div>
    </footer>
  );
}