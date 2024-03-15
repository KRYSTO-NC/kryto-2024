import React from 'react'
import './utils.css'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 10

    // Si le nombre de pages est inférieur ou égal à 10, affichez tous les boutons de page
    if (pages <= maxPageButtons) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(
          <a
            key={i}
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i}`
                  : `/page/${i}`
                : `/admin/page/${i}`
            }
            className={i === page ? 'active' : ''}
          >
            {i}
          </a>,
        )
      }
    } else {
      // Si plus de 10 pages, affichez les trois premières pages, les trois dernières pages, et des points de suspension entre
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <a
            key={i}
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i}`
                  : `/page/${i}`
                : `/admin/page/${i}`
            }
            className={i === page ? 'active' : ''}
          >
            {i}
          </a>,
        )
      }
      pageNumbers.push(<span key="dots1">...</span>)
      for (let i = pages - 2; i <= pages; i++) {
        pageNumbers.push(
          <a
            key={i}
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${i}`
                  : `/page/${i}`
                : `/admin/page/${i}`
            }
            className={i === page ? 'active' : ''}
          >
            {i}
          </a>,
        )
      }
    }

    return pageNumbers
  }

  return (
    pages > 1 && (
      <>
      <div className="paginate">

     
        <div className="paginate-container">
          {/* Afficher le numéro de la page actuelle */}

          {/* Bouton pour aller à la première page */}
          <a
            href={
              !isAdmin
              ? keyword
              ? `/search/${keyword}/page/1`
              : '/page/1'
              : '/admin/products/1'
            }
            className={page === 1 ? 'disabled' : ''}
            >
            &lt;&lt;
          </a>

          {/* Afficher les numéros de page */}
          {renderPageNumbers()}

          {/* Bouton pour aller à la dernière page */}
          <a
            href={
              !isAdmin
              ? keyword
              ? `/search/${keyword}/page/${pages}`
              : `/page/${pages}`
              : `/admin/page/${pages}`
            }
            className={page === pages ? 'disabled' : ''}
            >
            &gt;&gt;
          </a>
        </div>
        <div className="page-number-text">
          Pages : {page}/{pages}
        </div>
            </div>
      </>
    )
  )
}

export default Paginate

