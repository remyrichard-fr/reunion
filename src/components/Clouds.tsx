import Cloud from './Cloud'

type Props = {}

export default function Clouds({}: Props) {
  return (
    <div className="clouds">
        <Cloud id="one" />
        <Cloud id="two" />
        <Cloud id="three" />
    </div>
  )
}