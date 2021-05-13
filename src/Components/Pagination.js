import React from 'react'

export default function Pagination({content, contentPerPage}) {
    
    const pageNumber = Math.floor(content.length / contentPerPage) + 1

    function getPages() {

        let pages = []

        for (let i = 0; i < pageNumber; i++) {
            if (i === 0) {
                pages.push(
                <div className="page" id="current-page"> {i} </div>
                )
            } else {
                pages.push(
                    <div className="page"> {i} </div>
                )
            }
        }

        return pages
    }
    
    return (
        <div className="pagination">
            <div className="prev-page page"> {"<"} </div>
            {getPages()}
            <div className="next-page page"> {">"} </div>
        </div>
    )
}
