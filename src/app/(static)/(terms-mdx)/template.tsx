export default function Markdown({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='relative min-h-dvh'>
      <div className='mx-auto max-w-screen-lg px-4 pt-10 pb-8'>{children}</div>
    </main>
  );
}
