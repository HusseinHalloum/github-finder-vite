import {
  FaCodepen,
  FaStore,
  FaUserFriends,
  FaUsers,
  FaChevronLeft,
} from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import Spinner from '../components/layout/Spinner'
import RepoList from '../components/repos/RepoList'
import { getUserAndRepos } from '../context/github/GithubActions'
function User() {
  const { user, repos, loading, dispatch } = useContext(GithubContext)

  const routeLocation = useLocation()

  useEffect(() => {
    dispatch({ type: 'CLEAR_USER_AND_REPOS' })
  }, [routeLocation.pathname])

  const params = useParams()

  useEffect(() => {
    dispatch({ type: 'SET_lOADING' })
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login)
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData })

      // const userData = await getUser(params.login)
      // dispatch({ type: 'GET_USER', payload: userData })

      // const userRepoData = await getUserRepos(params.login)
      // dispatch({ type: 'GET_REPOS', payload: userRepoData })
    }
    getUserData()
  }, [dispatch, params.login])

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) {
    return <Spinner />
  }

  // NOTE: check for valid url to users website
  const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog

  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost uppercase'>
            <FaChevronLeft className='mr-1' />
            Back To Search
          </Link>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure className='absolute top-0 left-0 w-100 h-100'>
                <img src={avatar_url} alt={name} />
              </figure>
              <figure>
                <img src={avatar_url} alt={name} />
              </figure>
              <div className='card-body justify-end'>
                <h2 className='card-title mb-0'>{name}</h2>
                <p className='flex-grow-0'>{login}</p>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-6'>
              <h1 className='text-3xl card-title mb-4'>
                {name}
                <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                {hireable && (
                  <div className='mx-1 badge badge-info'>Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className='mt-4 card-actions'>
                <a
                  href={html_url}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='btn btn-outline btn-success uppercase'
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
            {(location || blog || twitter_username) && (
              <div className='w-full rounded-lg shadow-md bg-base-300 xl:bg-base-300 xl:stats xl:py-5'>
                {location && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Location</div>
                    <div className='text-lg stat-value'>{location}</div>
                  </div>
                )}
                {blog && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Website</div>
                    <div className='text-lg stat-value'>
                      <a
                        href={websiteUrl}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        {websiteUrl}
                      </a>
                    </div>
                  </div>
                )}
                {twitter_username && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Twitter</div>
                    <div className='text-lg stat-value'>
                      <a
                        href={`https://twitter.com/${twitter_username}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        {twitter_username}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-300 stats'>
          <div className='grid grid-cols-1 md:grid-cols-4'>
            <div className='stat border-r-1'>
              <div className='stat-figure text-secondary'>
                <FaUsers className='text-3xl md:text-5xl' fill='#00a96e' />
              </div>
              <div className='stat-title pr-5'>Followers</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {followers}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaUserFriends
                  className='text-3xl md:text-5xl'
                  fill='#00a96e'
                />
              </div>
              <div className='stat-title pr-5'>Following</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {following}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaCodepen className='text-3xl md:text-5xl' fill='#00a96e' />
              </div>
              <div className='stat-title pr-5'>Public Repos</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_repos}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaStore className='text-3xl md:text-5xl' fill='#00a96e' />
              </div>
              <div className='stat-title pr-5'>Public Gists</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_gists}
              </div>
            </div>
          </div>
        </div>

        <RepoList repos={repos} />
      </div>
    </>
  )
}

export default User
