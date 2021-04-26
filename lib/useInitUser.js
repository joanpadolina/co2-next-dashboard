import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCommunityUser, fetchUser } from '../redux/actions'

export default function useInitUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser)
    dispatch(fetchCommunityUser)
  }, [dispatch])
}
