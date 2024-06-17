import './Spinner.css'

export default function Spinner({ loading }) {
  return (
    <div className='spinner' style={{ display: loading ? 'block' : 'none' }}></div>
  )
}
