import { useState } from "react";

export function Articles(params) {
  let articles = (params.data.articles) ? params.data.articles : [];
  let queryName = (params.query.queryName) ? params.query.queryName : "na";
  let articleCount = (params.data.totalResults) ? params.data.totalResults : 0;

  const [showList, setShowList] = useState(true);

  const toggleList = () => {
    setShowList(prev => !prev);
  };

  return (

    <div className="container">
      <p><strong>Selected Query:</strong> {queryName}</p>
      <p><strong>Article Results Count:</strong> {articleCount}</p>

      <button onClick={toggleList}>
        {showList ? 'Hide Query Results' : 'Show Query Results'}
      </button>

      {showList && (
        <div id="articleList">
          <ol >{
            articles.map((item, idx) => {
              if (item) {
                if (item.title) {
                  if (item.title === "[Removed]") {
                    return (<li key={idx} >Was Removed</li>);
                  }
                  // increased trim length to 60 characters
                  let trimTitle = item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title;
                return (
                  <li key={idx}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {trimTitle}
                    </a>
                  </li>
                );
              } else {
                return (<li key={idx}>No Title</li>);
              }
            } else {
              return (<li key={idx}>No Item</li>);
              }
            })
          }</ol>
        </div>
      )}
    </div>
  );

}