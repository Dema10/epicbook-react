import Buttons from "../componets/Buttons";
import Welcome from "../componets/Welcome";


export default function Home({ search }) {
  return (
    <>
        <Welcome />
        <Buttons search={search} />
    </>
  )
}
