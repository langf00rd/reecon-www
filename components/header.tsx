export default async function Header(props: { title: string }) {
  return (
    <header>
      <h1 className="text-2xl">{props.title}</h1>
    </header>
  );
}
