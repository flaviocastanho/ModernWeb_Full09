import "./styles.scss";

type Props = {
  title: string;
};

export default function MyHeader({ title }: Props) {
    return (
      <header>
        <div></div>
        <h2>{title}</h2>
      </header>
      
  );
}
