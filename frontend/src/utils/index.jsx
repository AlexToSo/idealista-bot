import { useState } from 'react'
import Cookies from 'js-cookie'

export function useFetch (url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const token = Cookies.get('_auth')

  function isJSON (str) {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  function request () {
    setData(null)
    setLoading(true)
    setError(null)

    if (!url) return

    async function fetchData () {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.status >= 200 && response.status < 300) setData(data)
        else throw new Error(data.error)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }

  function appendData (newData, method, callback) {
    setData(null)
    setLoading(true)
    setError(null)

    if (!url) return
    // Headers set up. If JSON, we specify it
    const headers = { Authorization: `Bearer ${token}` }
    if (isJSON(newData)) headers['Content-Type'] = 'application/json'
    async function fetchData (newData) {
      try {
        const response = await fetch(url, {
          method,
          body: newData,
          headers
        })
        const data = await response.json()
        if (response.status >= 200 && response.status < 300) setData(data)
        else throw new Error(data.error)

        callback(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData(newData)
  }

  return { request, appendData, loading, data, error }
}
