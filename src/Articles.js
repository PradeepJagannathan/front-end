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
      <p><strong>Query:</strong> {queryName}</p>
      <p><strong>Count:</strong> {articleCount}</p>

      <button onClick={toggleList}>
        {showList ? 'Hide Query Results' : 'Show Query Results'}
      </button>

      {showList && (
        <div id="articleList">
          <ol>
            {articles.map((item, idx) => {
              if (!item) return <li key={idx}>No Item</li>;
              if (!item.title) return <li key={idx}>No Title</li>;
              if (item.title === "[Removed]") return <li key={idx}>Was Removed</li>;

              const trimTitle = item.title.substring(0, 30);
              return (
                <li key={idx}>
                  {trimTitle}
                  <a href={item.url} target="_blank" rel="noreferrer"> &rarr; Link</a>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>

  );
}