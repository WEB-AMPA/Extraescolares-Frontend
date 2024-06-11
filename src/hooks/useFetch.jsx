import axios from 'axios'
import { useEffect, useState } from 'react'

export default function usefetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (url === undefined) return setError("Invalid URL")

  useEffect(() => {
    const controller = new AbortController()
    axios
      .get(url, { signal: controller.signal })
      .then(response => setData(response.data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
