import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import axios from 'axios';
import './home.scss';
import List from '../../components/list/List';

const Home = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer ' +
                JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      <div style={{ marginTop: '50px' }}>
        {lists.map((list, index) => (
          <div key={index}>
            <List list={list} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
