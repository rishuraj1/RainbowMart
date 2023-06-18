import React, { useEffect, useState } from 'react';
import { Databases, ID } from 'appwrite';
import { client } from '../appwrite';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai'

const Home = ({ user, setUser }) => {

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  const database = new Databases(client);
  // Fetch previous posts
  useEffect(() => {
    (async () => {
      const dbTweets = await database.listDocuments('events', 'posts');
      setTweets(dbTweets.documents);
      console.log(dbTweets)
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create new post object
    const result = await database.createDocument('events', 'posts', ID.unique(), {
      author: user.name,
      content: newTweet,
      timestamp: new Date().toLocaleString()
    });
    console.log(result);
  };


  return (
    <div className="flex flex-col justify-center pr-10 pl-10  gap-5 bg-cyan-400 min-h-screen">
      <h1 className="text-2xl font-bold mt-8">Home Feed</h1>
      <div className='bg-cyan-600 p-4 rounded-lg'>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
          {user ? (
            <div className='flex justify-start items-center gap-5'>
              <img src={user.picture} alt={user.name} width={60} className='object-cover rounded-full' />
              <p className="text-cyan-950 mt-2 font-bold">Posting as {user.name}</p>
            </div>
          ) : (
            <div className='flex justify-start items-center gap-5'>
              <FaUserAlt className='fill-teal-400 object-cover text-4xl' />
              <p className="text-gray-900 mt-2 font-bold">Please sign in to post</p>
            </div>
          )
          }

          <h2 className="text-lg font-bold">New Post</h2>
          <p className="text-violet-950 font-bold">Share your thoughts with the world!</p>
          <textarea
            className={user ? "w-full bg-cyan-500 h-20 p-4 border border-none rounded focus:outline-none focus:border-blue-500 text-cyan-950 placeholder-teal-950 placeholder:outline-none placeholder:tracking-wide text-xl" : "w-full bg-cyan-700 h-20 p-4 border border-none rounded focus:outline-none focus:border-blue-500 text-cyan-950 placeholder-transparent"}
            placeholder="What's happening?"
            value={newTweet}
            disabled={!user}
            onChange={event => setNewTweet(event.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded transition-all duration-300 ease-in-out hover:bg-yellow-600 font-semibold text-xl"
            disabled={!user}
          >
            Post
          </button>
        </form>
        {tweets.map(tweet => (
          <div className="bg-white rounded-lg shadow p-4 mt-4" key={tweet.id}>
            <h3 className="text-lg font-bold">{tweet.author}</h3>
            <p className="text-gray-700">{tweet.content}</p>
            <p className="text-gray-500 mt-2">{tweet.timestamp}</p>
          </div>
        ))}
      </div>

    </div>
  )
}


export default Home
