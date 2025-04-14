export default function LayoutRoot({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
