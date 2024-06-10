import usefetch from "../../hooks/useFetch.jsx"

const Students = () => {

  const { data, loading, error } = usefetch(import.meta.env.VITE_URL + '/students')

  return (
    <>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
      <div>{data && data.map(item => {
          return (
            <div key={item._id}>{item.email} - {item.username}</div>
          )
          })}
      </div>
    </>
  )
}

export default Students