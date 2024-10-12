
export default function Markdown({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="relative bg-[radial-gradient(48%_100%_at_0%_70%,rgba(125,47,126,.16),rgba(70,62,124,0)_100%)] min-h-dvh">
      <div className="max-w-screen-lg pt-24 px-4 pb-40 mx-auto ">
        {children}
      </div>
    </main>
  );
}
