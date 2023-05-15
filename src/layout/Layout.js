import  Footer  from './Footer'
import { Header } from './Header'

export const Layout = (props) => {
    return (
        <div>
            <Header />
            <div className='container'>{props.children}</div>
            <Footer/>
        </div>
    )
}