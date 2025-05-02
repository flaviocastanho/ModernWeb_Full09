import './styles.scss'

type Props = {
    title: string
    click: () => void
}

export default function MyButton({ title, click }: Props) {
    return (
        <div className="my-button">
            <button onClick={click}>{title}</button>
        </div>
    )
}
