export function SavedQueries(params) {

  function onSavedQueryClick(savedQuery) {
    params.onQuerySelect(savedQuery);
  }

  function getLanguageName(languageCode) {
    const languageMap = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German"
    };
    return languageMap[languageCode] || "all languages";
  }

  function getQueries() {
    return params.savedQueries.map((item, idx) => {
      let trimTitle = item.queryName.substring(0, 30);
      return (
        <li
          key={idx}
          onClick={() => onSavedQueryClick(item)}
          className={(item.queryName === params.selectedQueryName) ? "selected" : ""}
        ><span className="queryTitle">{trimTitle}</span>{"- News articles about "} <span className="queryProperties">{item.q}</span> {" in "} <span className="queryProperties">{getLanguageName(item.language)}</span>  {" with a page limit of "} <span className="queryProperties">{item.pageSize}</span>
        </li>
      );
    })
  }

  function onSubmitClick(event) {
    event.preventDefault();
    const confirmed = window.confirm("Are you sure you want to reset?");

    if (!confirmed) return;

    params.queriesReset();
  }

  return (
    <div className="parentSavedQueries">
      <ul >{
        (params.savedQueries && params.savedQueries.length > 0)
          ? getQueries()
          : <li>No Saved Queries, Yet!</li>
      }</ul>
      <span className={(params.currentUser) ? "visible" : "hidden"}>
        <input type="button" value="Reset" onClick={onSubmitClick} />
      </span>
    </div>
  )

}