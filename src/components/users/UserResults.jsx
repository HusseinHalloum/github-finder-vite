import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults(props) {
  const { users, loading } = useContext(GithubContext)
  const { dispatch } = useContext(GithubContext)
  const location = useLocation()

  // useEffect(() => {
  //   dispatch({ type: 'CLEAR_USERS' })
  // }, [location.pathname])

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
