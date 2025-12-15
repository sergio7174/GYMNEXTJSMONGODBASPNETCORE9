'use client'

const Pagination = ({ productsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
        <div className='pagination'  style={{display: 'flex', border: '1px solid #fff', justifyContent:'flex-start', alignContent:'center', padding: '20px'}}>
            {
                paginationNumber.map((data) => (
                    <button key={data} onClick={() => handlePagination(data)} className={currentPage === data ? 'active' : ''} style={{padding: '10px'}}>
                        {data}
                    </button>
                ))
            }
        </div>
    )
}
export default Pagination