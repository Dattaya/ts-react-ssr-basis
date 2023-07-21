import { InMemoryCache } from '@apollo/client/cache'

export default (): InMemoryCache => new InMemoryCache()
