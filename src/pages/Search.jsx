import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, PlayCircle, PauseCircle } from 'lucide-react';
import { getAllSongs } from '../services/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    fetchSongs();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(results);
  }, [searchTerm, songs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePlay = async (song) => {
    try {
      if (currentlyPlaying && currentlyPlaying._id === song._id) {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current.src = song.audioUrl;

        try {
          await audioRef.current.play();
          setCurrentlyPlaying(song);
        } catch (playError) {
          console.error("Playback failed:", playError);
          alert("Failed to play audio. Please check the audio URL.");
        }
      }
    } catch (err) {
      console.error("Audio handling error:", err);
      alert("An error occurred while handling audio playback");
    }
  };

  return (
    <div className="p-6">
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" placeholder="Search for songs or artists" className="w-full py-3 pl-12 pr-4 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:bg-white/20" value={searchTerm} onChange={handleSearch}/>
      </div>

      {searchTerm && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
          {filteredSongs.length > 0 ? (
            <ul className="bg-gray-800 rounded-lg overflow-hidden">
              {filteredSongs.map((song, index) => (
                <li key={song._id} className={`flex items-center justify-between p-4 ${ index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'} hover:bg-gray-600 transition-colors`}>
                  <div className="flex items-center flex-1">
                    <button onClick={() => togglePlay(song)} className="mr-4 text-purple-500 hover:text-purple-400 focus:outline-none"> {currentlyPlaying && currentlyPlaying._id === song._id ? ( <PauseCircle size={24} />) : ( <PlayCircle size={24} />)}</button>
                    <div>
                      <h3 className="font-semibold text-white">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-gray-400">{song.duration}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No songs found</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Search;