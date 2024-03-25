import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import axios from 'axios';
import './home.scss';
import List from '../../components/list/List';
import { AuthContext } from '../../authContext/AuthContext';

const Home = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const [lists, setLists] = useState([]);
  const { user } = useContext(AuthContext);
  const token = user.accessToken;

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        if (token !== null) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/lists${
              type ? '?type=' + type : ''
            }${genre ? '&genre=' + genre : ''}`,
            {
              headers: {
                token: 'Bearer ' + token,
              },
            }
          );
          setLists(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre, token]);
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
