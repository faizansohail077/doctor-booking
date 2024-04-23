import { Header } from '@/components'

const PageNotFound = () => {
    return (
        <>
            <Header />
            <div className="h-[80vh] flex items-center justify-center">
                <h1 className="text-4xl">404 | Page Not Found</h1>
            </div>
        </>
    )
}

export default PageNotFound