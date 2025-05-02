import './styles.scss'

type Props = {
    label: string
    value?: string
    change: (value: string) => void
    type?: React.HTMLInputTypeAttribute
    disabled?:boolean
}

export default function MyInput(props: Props) {
    return (
      <div className="my-input">
        <div>{props.label}:</div>
        <input
          type={props.type ? props.type : "text"}
          value={props.value}
          onChange={(e) => props.change(e.target.value)}
          disabled={props.disabled}
        />
      </div>
    );
}