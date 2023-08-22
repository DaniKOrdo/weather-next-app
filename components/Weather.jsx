export function Weather ({ data }) {
  const { name } = data
  const { temp } = data.main

  return (
    <div>
      <p>Location: {name}</p>
      <p>Temperature: {temp}&#176;</p>
    </div>
  )
}
