(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{134:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return o})),r.d(n,"metadata",(function(){return c})),r.d(n,"rightToc",(function(){return u})),r.d(n,"default",(function(){return l}));var t=r(1),a=r(6),s=(r(0),r(167)),o={title:"Asynchronous Data Queries",sidebar_label:"Asynchronous Data Queries"},c={id:"guides/asynchronous-data-queries",title:"Asynchronous Data Queries",description:"Recoil provides a way to map state and derived state to React components via a data-flow graph. What's really powerful is that the functions in the graph can also be asynchronous. This makes it easy to use asynchronous functions in synchronous React component render functions. Recoil allows you to seamlessly mix synchronous and asynchronous functions in your data-flow graph of selectors. Simply return a Promise to a value instead of the value itself from a selector `get` callback, the interface remains exactly the same. Because these are just selectors, other selectors can also depend on them to further transform the data.",source:"@site/docs/guides/asynchronous-data-queries.md",permalink:"/docs/guides/asynchronous-data-queries",editUrl:"https://github.com/facebookexperimental/Recoil/edit/docs/docs/docs/guides/asynchronous-data-queries.md",sidebar_label:"Asynchronous Data Queries",sidebar:"docs",previous:{title:"Selectors",permalink:"/docs/basic-tutorial/selectors"},next:{title:"Asynchronous State Sync",permalink:"/docs/guides/asynchronous-state-sync"}},u=[{value:"Synchronous Example",id:"synchronous-example",children:[]},{value:"Asynchronous Example",id:"asynchronous-example",children:[]},{value:"Error Handling",id:"error-handling",children:[]},{value:"Queries with Parameters",id:"queries-with-parameters",children:[]},{value:"Data-Flow Graph",id:"data-flow-graph",children:[]},{value:"Concurrent Requests",id:"concurrent-requests",children:[]},{value:"Pre-Fetching",id:"pre-fetching",children:[]},{value:"Query Refresh",id:"query-refresh",children:[{value:"Use a Request ID",id:"use-a-request-id",children:[]},{value:"Use an Atom",id:"use-an-atom",children:[]}]},{value:"Async Queries Without React Suspense",id:"async-queries-without-react-suspense",children:[]}],i={rightToc:u};function l(e){var n=e.components,r=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(t.a)({},i,r,{components:n,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Recoil provides a way to map state and derived state to React components via a data-flow graph. What's really powerful is that the functions in the graph can also be asynchronous. This makes it easy to use asynchronous functions in synchronous React component render functions. Recoil allows you to seamlessly mix synchronous and asynchronous functions in your data-flow graph of selectors. Simply return a Promise to a value instead of the value itself from a selector ",Object(s.b)("inlineCode",{parentName:"p"},"get")," callback, the interface remains exactly the same. Because these are just selectors, other selectors can also depend on them to further transform the data."),Object(s.b)("p",null,"Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph.  Please keep in mind that selectors represent pure functions: For a given set of inputs they should always produce the same results (at least for the lifetime of the application).  This is important as selector evaluations may execute one or more times, may be restarted, and may be cached.  Because of this, selectors are a good way to model read-only DB queries where repeating a query provides consistent data.  For mutable data check out ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"#query-refresh"}),"Query Refresh"),", or if you are looking to synchronize local and server state, then please see ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/guides/asynchronous-state-sync"}),"Asynchronous State Sync")," or ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/guides/persistence"}),"State Persistence"),"."),Object(s.b)("h2",{id:"synchronous-example"},"Synchronous Example"),Object(s.b)("p",null,"For example, here is a simple synchronous ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/core/atom"}),"atom")," and ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/core/selector"}),"selector")," to get a user name:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const currentUserIDState = atom({\n  key: 'CurrentUserID',\n  default: 1,\n});\n\nconst currentUserNameState = selector({\n  key: 'CurrentUserName',\n  get: ({get}) => {\n    return tableOfUsers[get(currentUserIDState)].name;\n  },\n});\n\nfunction CurrentUserInfo() {\n  const userName = useRecoilValue(currentUserNameState);\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <RecoilRoot>\n      <CurrentUserInfo />\n    </RecoilRoot>\n  );\n}\n")),Object(s.b)("h2",{id:"asynchronous-example"},"Asynchronous Example"),Object(s.b)("p",null,"If the user names were stored in some database we need to query, all we need to do is return a ",Object(s.b)("inlineCode",{parentName:"p"},"Promise")," or use an ",Object(s.b)("inlineCode",{parentName:"p"},"async")," function. If any dependencies change, the selector will be re-evaluated and execute a new query. The results are cached, so the query will only execute once per unique input."),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const currentUserNameQuery = selector({\n  key: 'CurrentUserName',\n  get: async ({get}) => {\n    const response = await myDBQuery({\n      userID: get(currentUserIDState),\n    });\n    return response.name;\n  },\n});\n\nfunction CurrentUserInfo() {\n  const userName = useRecoilValue(currentUserNameQuery);\n  return <div>{userName}</div>;\n}\n")),Object(s.b)("p",null,"The interface of the selector is the same, so the component using this selector doesn't need to care if it was backed with synchronous atom state, derived selector state, or asynchronous queries!"),Object(s.b)("p",null,"But, since React render functions are synchronous, what will it render before the promise resolves? Recoil is designed to work with ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"https://reactjs.org/docs/concurrent-mode-suspense.html"}),"React Suspense")," to handle pending data. Wrapping your component with a Suspense boundary will catch any descendants that are still pending and render a fallback UI:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"function MyApp() {\n  return (\n    <RecoilRoot>\n      <React.Suspense fallback={<div>Loading...</div>}>\n        <CurrentUserInfo />\n      </React.Suspense>\n    </RecoilRoot>\n  );\n}\n")),Object(s.b)("h2",{id:"error-handling"},"Error Handling"),Object(s.b)("p",null,"But what if the request has an error? Recoil selectors can also throw errors which will then be thrown if a component tries to use that value. This can be caught with a React ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"https://reactjs.org/docs/error-boundaries.html"}),Object(s.b)("inlineCode",{parentName:"a"},"<ErrorBoundary>")),". For example:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const currentUserNameQuery = selector({\n  key: 'CurrentUserName',\n  get: async ({get}) => {\n    const response = await myDBQuery({\n      userID: get(currentUserIDState),\n    });\n    if (response.error) {\n      throw response.error;\n    }\n    return response.name;\n  },\n});\n\nfunction CurrentUserInfo() {\n  const userName = useRecoilValue(currentUserNameQuery);\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <RecoilRoot>\n      <ErrorBoundary>\n        <React.Suspense fallback={<div>Loading...</div>}>\n          <CurrentUserInfo />\n        </React.Suspense>\n      </ErrorBoundary>\n    </RecoilRoot>\n  );\n}\n")),Object(s.b)("h2",{id:"queries-with-parameters"},"Queries with Parameters"),Object(s.b)("p",null,"Sometimes you want to be able to query based on parameters that aren't just based on derived state. For example, you may want to query based on the component props. You can do that using the ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/utils/selectorFamily"}),Object(s.b)("strong",{parentName:"a"},Object(s.b)("inlineCode",{parentName:"strong"},"selectorFamily")))," helper:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const userNameQuery = selectorFamily({\n  key: 'UserName',\n  get: userID => async () => {\n    const response = await myDBQuery({userID});\n    if (response.error) {\n      throw response.error;\n    }\n    return response.name;\n  },\n});\n\nfunction UserInfo({userID}) {\n  const userName = useRecoilValue(userNameQuery(userID));\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <RecoilRoot>\n      <ErrorBoundary>\n        <React.Suspense fallback={<div>Loading...</div>}>\n          <UserInfo userID={1}/>\n          <UserInfo userID={2}/>\n          <UserInfo userID={3}/>\n        </React.Suspense>\n      </ErrorBoundary>\n    </RecoilRoot>\n  );\n}\n")),Object(s.b)("h2",{id:"data-flow-graph"},"Data-Flow Graph"),Object(s.b)("p",null,"Remember, by modeling queries as selectors, we can build a data-flow graph mixing state, derived state, and queries!  This graph will automatically update and re-render React components as state is updated."),Object(s.b)("p",null,"The following example will render the current user's name and a list of their friends.  If a friend's name is clicked on, they will become the current user and the name and list will be automatically updated."),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const currentUserIDState = atom({\n  key: 'CurrentUserID',\n  default: null,\n});\n\nconst userInfoQuery = selectorFamily({\n  key: 'UserInfoQuery',\n  get: userID => async () => {\n    const response = await myDBQuery({userID});\n    if (response.error) {\n      throw response.error;\n    }\n    return response;\n  },\n});\n\nconst currentUserInfoQuery = selector({\n  key: 'CurrentUserInfoQuery',\n  get: ({get}) => get(userInfoQuery(get(currentUserIDState))),\n});\n\nconst friendsInfoQuery = selector({\n  key: 'FriendsInfoQuery',\n  get: ({get}) => {\n    const {friendList} = get(currentUserInfoQuery);\n    return friendList.map(friendID => get(userInfoQuery(friendID)));\n  },\n});\n\nfunction CurrentUserInfo() {\n  const currentUser = useRecoilValue(currentUserInfoQuery);\n  const friends = useRecoilValue(friendsInfoQuery);\n  const setCurrentUserID = useSetRecoilState(currentUserIDState);\n  return (\n    <div>\n      <h1>{currentUser.name}</h1>\n      <ul>\n        {friends.map(friend =>\n          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>\n            {friend.name}\n          </li>\n        )}\n      </ul>\n    </div>\n  );\n}\n\nfunction MyApp() {\n  return (\n    <RecoilRoot>\n      <ErrorBoundary>\n        <React.Suspense fallback={<div>Loading...</div>}>\n          <CurrentUserInfo />\n        </React.Suspense>\n      </ErrorBoundary>\n    </RecoilRoot>\n  );\n}\n")),Object(s.b)("h2",{id:"concurrent-requests"},"Concurrent Requests"),Object(s.b)("p",null,"If you notice in the above example, the ",Object(s.b)("inlineCode",{parentName:"p"},"friendsInfoQuery")," uses a query to get the info for each friend.  But, by doing this in a loop they are essentially serialized.  If the lookup is fast, maybe that's ok.  If it's expensive, you can use a concurrency helper such as ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/utils/waitForAll"}),Object(s.b)("inlineCode",{parentName:"a"},"waitForAll"))," to run them in parallel.  This helper accepts both arrays and named objects of dependencies."),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const friendsInfoQuery = selector({\n  key: 'FriendsInfoQuery',\n  get: ({get}) => {\n    const {friendList} = get(currentUserInfoQuery);\n    const friends = get(waitForAll(\n      friendList.map(friendID => userInfoQuery(friendID))\n    ));\n    return friends;\n  },\n});\n")),Object(s.b)("p",null,"You can use ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/utils/waitForNone"}),Object(s.b)("inlineCode",{parentName:"a"},"waitForNone"))," to handle incremental updates to the UI with partial data"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const friendsInfoQuery = selector({\n  key: 'FriendsInfoQuery',\n  get: ({get}) => {\n    const {friendList} = get(currentUserInfoQuery);\n    const friendLoadables = get(waitForNone(\n      friendList.map(friendID => userInfoQuery(friendID))\n    ));\n    return friendLoadables\n      .filter(({state}) => state === 'hasValue')\n      .map(({contents}) => contents);\n  },\n});\n")),Object(s.b)("h2",{id:"pre-fetching"},"Pre-Fetching"),Object(s.b)("p",null,"For performance reasons you may wish to kick off fetching ",Object(s.b)("em",{parentName:"p"},"before")," rendering.  That way the query can be going while we start rendering.  The ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"https://reactjs.org/docs/concurrent-mode-suspense.html#start-fetching-early"}),"React docs")," give some examples.  This pattern works with Recoil as well."),Object(s.b)("p",null,"Let's change the above example to initiate a fetch for the next user info as soon as the user clicks the button to change users:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"function CurrentUserInfo() {\n  const currentUser = useRecoilValue(currentUserInfoQuery);\n  const friends = useRecoilValue(friendsInfoQuery);\n\n  const changeUser = useRecoilCallback(({snapshot, set}) => userID => {\n    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info\n    set(currentUserIDState, userID); // change current user to start new render\n  });\n\n  return (\n    <div>\n      <h1>{currentUser.name}</h1>\n      <ul>\n        {friends.map(friend =>\n          <li key={friend.id} onClick={() => changeUser(friend.id)}>\n            {friend.name}\n          </li>\n        )}\n      </ul>\n    </div>\n  );\n}\n")),Object(s.b)("h2",{id:"query-refresh"},"Query Refresh"),Object(s.b)("p",null,"When using selectors to model data queries, it's important to remember that selector evaluation should always provide a consistent value for a given state.  Selectors represent state derived from other atom and selector states.  Thus, selector evaluation functions should be idempotent for a given input, as it may be cached or executed multiple times.  Practically, that means a single selector should not be used for a query where you expect the results to vary during the application's lifetime."),Object(s.b)("p",null,"There are a few patterns you can use for working with mutable data:"),Object(s.b)("h3",{id:"use-a-request-id"},"Use a Request ID"),Object(s.b)("p",null,"Selector evaluation should provide a consistent value for a given state based on input (dependent state or family parameters).  So, you could add a request ID as either a family parameter or a dependency to your query.  For example:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const userInfoQueryRequestIDState = atomFamily({\n  key: 'UserInfoQueryRequestID',\n  default: 0,\n});\n\nconst userInfoQuery = selectorFamily({\n  key: 'UserInfoQuery',\n  get: userID => async ({get}) => {\n    get(userInfoQueryRequestIDState(userID)); // Add request ID as a dependency\n    const response = await myDBQuery({userID});\n    if (response.error) {\n      throw response.error;\n    }\n    return response;\n  },\n});\n\nfunction useRefreshUserInfo(userID) {\n  setUserInfoQueryRequestID = useSetRecoilState(userInfoQueryRequestIDState(userID));\n  return () => {\n    setUserInfoQueryRequestID(requestID => requestID++);\n  };\n}\n\nfunction CurrentUserInfo() {\n  const currentUserID = useRecoilValue(currentUserIDState);\n  const currentUserInfo = userRecoilValue(userInfoQuery(currentUserID));\n  const refreshUserInfo = useRefreshUserInfo(currentUserID);\n\n  return (\n    <div>\n      <h1>{currentUser.name}</h1>\n      <button onClick={refreshUserInfo}>Refresh</button>\n    </div>\n  );\n}\n")),Object(s.b)("h3",{id:"use-an-atom"},"Use an Atom"),Object(s.b)("p",null,"Another option is to use an atom, instead of a selector, to model the query results.  You can imperatively update the atom state with the new query results based on your refresh policy."),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"const userInfoState = atomFamily({\n  key: 'UserInfo',\n  default: userID => fetch(userInfoURL(userID)),\n});\n\n// React component to refresh query\nfunction RefreshUserInfo({userID}) {\n  const refreshUserInfo = useRecoilCallback(({set}) => async id => {\n    const userInfo = await myDBQuery({userID});\n    set(userInfoState(userID), userInfo);\n  }, [userID]);\n\n  // Refresh user info every second\n  useEffect(() => {\n    const intervalID = setInterval(refreshUserInfo, 1000);\n    return () => clearInterval(intervalID);\n  }, [refreshUserInfo]);\n\n  return null;\n}\n")),Object(s.b)("p",null,"One downside to this approach is that atoms do not ",Object(s.b)("em",{parentName:"p"},"currently")," support accepting a ",Object(s.b)("inlineCode",{parentName:"p"},"Promise")," as the new value in order to automatically take advantage of React Suspense while the query refresh is pending, if that is your desired behavior.  However, you could store an object which manually encodes the loading status as well as the results if desired."),Object(s.b)("h2",{id:"async-queries-without-react-suspense"},"Async Queries Without React Suspense"),Object(s.b)("p",null,"It is not necessary to use React Suspense for handling pending asynchronous selectors. You can also use the ",Object(s.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/api-reference/core/useRecoilValueLoadable"}),Object(s.b)("inlineCode",{parentName:"a"},"useRecoilValueLoadable()"))," hook to determine the status during rendering:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-jsx"}),"function UserInfo({userID}) {\n  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));\n  switch (userNameLoadable.state) {\n    case 'hasValue':\n      return <div>{userNameLoadable.contents}</div>;\n    case 'loading':\n      return <div>Loading...</div>;\n    case 'hasError':\n      throw userNameLoadable.contents;\n  }\n}\n")))}l.isMDXComponent=!0},167:function(e,n,r){"use strict";r.d(n,"a",(function(){return d})),r.d(n,"b",(function(){return f}));var t=r(0),a=r.n(t);function s(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){s(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function u(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},s=Object.keys(e);for(t=0;t<s.length;t++)r=s[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)r=s[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=a.a.createContext({}),l=function(e){var n=a.a.useContext(i),r=n;return e&&(r="function"==typeof e?e(n):c({},n,{},e)),r},d=function(e){var n=l(e.components);return a.a.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},h=Object(t.forwardRef)((function(e,n){var r=e.components,t=e.mdxType,s=e.originalType,o=e.parentName,i=u(e,["components","mdxType","originalType","parentName"]),d=l(r),h=t,f=d["".concat(o,".").concat(h)]||d[h]||p[h]||s;return r?a.a.createElement(f,c({ref:n},i,{components:r})):a.a.createElement(f,c({ref:n},i))}));function f(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var s=r.length,o=new Array(s);o[0]=h;var c={};for(var u in n)hasOwnProperty.call(n,u)&&(c[u]=n[u]);c.originalType=e,c.mdxType="string"==typeof e?e:t,o[1]=c;for(var i=2;i<s;i++)o[i]=r[i];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}h.displayName="MDXCreateElement"}}]);