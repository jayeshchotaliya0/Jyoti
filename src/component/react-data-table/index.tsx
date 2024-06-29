import React from 'react'
import Search from './HeaderSearch/Search'
import ShowPaginate from './HeaderPaginate/ShowPaginate'

const PaginateSearch = () => {
    return (
        <>
            <ShowPaginate />
            <Search />
        </>
    )
}

export default PaginateSearch