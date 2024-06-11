// import usefetch from "../../hooks/useFetch.jsx"
import { useState } from "react"
import useFetchPagination from "../../../hooks/useFetchPagination.jsx"
import Pagination from "../../utils/pagination.jsx"

const Users = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [searchRole, setSearchRole] = useState("")
  const pageSize = 10

  const { data, loading, error } = useFetchPagination(import.meta.env.VITE_URL + '/users', currentPage, pageSize, searchRole)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleRoleChange = (e) => {
    setSearchRole(e.target.value)
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {data && data.map(item => {
        return (
          <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div className="ps-3">
                <div className="text-base font-semibold">{item.username}</div>
                <div className="font-normal text-gray-500">{item.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              {item.role.name}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
              </div>
            </td>
            <td className="px-6 py-4">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
            </td>
          </tr>
        )
      })}
    <Pagination currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
    </>
  )
}

export default Users