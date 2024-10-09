import { Mic2, Music2, Radio } from 'lucide-react';
const Home = () => {
  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold text-white mb-6"> Welcome to <span className="text-purple-400">MusicVerse</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: <Mic2 size={24} />, title: 'Voice Match', desc: 'Find songs by best matches' },
          { icon: <Music2 size={24} />, title: 'Smart Mix', desc: 'AI-powered playlist creation' },
          { icon: <Radio size={24} />, title: 'Live Sessions', desc: 'Join live listening parties' }
        ].map((feature, index) => (
          <div key={index} className="bg-purple-900 backdrop-blur-sm rounded-xl p-6 hover:bg-purple-900/40 transition-all cursor-pointer">
            <div className="text-purple-400 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';

// const Home = () => {
//   const [recentSearches, setRecentSearches] = useState([]);

//   useEffect(() => {
//     // This is where you would fetch the recent searches
//     // For example:
//     // fetchRecentSearches().then(setRecentSearches);
    
//     // For demonstration, we'll use setTimeout to simulate an API call
//     const simulateFetch = setTimeout(() => {
//       setRecentSearches([
//         { query: 'Best 80s hits', timestamp: new Date(Date.now() - 3600000).toISOString() },
//         { query: 'Jazz piano', timestamp: new Date(Date.now() - 7200000).toISOString() },
//         { query: 'Rock anthems playlist', timestamp: new Date(Date.now() - 86400000).toISOString() }
//       ]);
//     }, 1000);

//     return () => clearTimeout(simulateFetch);
//   }, []);

//   const formatTimestamp = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString('en-US', { 
//       hour: 'numeric', 
//       minute: 'numeric', 
//       hour12: true, 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Welcome to MusicVerse</h1>
      
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Recent Searches</h2>
//         {recentSearches.length === 0 ? (
//           <p>Loading recent searches...</p>
//         ) : (
//           <div className="flex flex-wrap gap-4">
//             {recentSearches.map((search, index) => (
//               <div key={index} className="flex-1 min-w-[200px] p-4 bg-gray-100 rounded-lg shadow-md">
//                 <div className="flex items-center mb-2">
//                   <Search className="w-5 h-5 mr-2" />
//                   <span className="font-medium">{search.query}</span>
//                 </div>
//                 <p className="text-sm text-gray-600">{formatTimestamp(search.timestamp)}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;