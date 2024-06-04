import usefetch from "../../hooks/useFetch.jsx"

const Users = () => {

  const { data, loading, error } = usefetch(import.meta.env.VITE_URL + '/users')

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

export default Users