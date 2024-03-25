import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { truncateWords } from '../../utils/helper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import './featured.scss';
import { AuthContext } from '../../authContext/AuthContext';

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const { user } = useContext(AuthContext);
  const token = user.accessToken;

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        if (token !== null) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/movies/random?type=${type}`,
            {
              headers: {
                token: 'Bearer ' + token,
              },
            }
          );
          setContent(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type, token]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {content && (
        <div>
          <div className="imgContainer">
            <img src={content.img} alt="" />
          </div>
          <div className="overlay"></div>
          <div className="info">
            <div className="thumbnail">
              <img src={content.imgSm} alt="" />
            </div>
            <h3 className="title">{content.title}</h3>
            <span className="desc">{truncateWords(content?.desc, 200)}</span>
            <div className="buttons">
              <button className="play">
                <PlayArrowIcon />
                <span>Play</span>
              </button>
              <button className="more">
                <InfoIcon />
                <span>Info</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
