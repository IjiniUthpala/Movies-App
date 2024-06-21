// MovieListItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=f1e83908c6b47197355e7a7563b16feb&append_to_response=videos`)
      .then(response => {
        setMovie(response.data);
      })
  }, [props.movie.id]);

  const openVideoModal = (videoId) => {
    setIsVideoModalOpen(true);
    setVideoId(videoId);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoId('');
  };

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
  let imageurl = IMAGEPATH + props.movie.poster_path;

  let genres = "";
  if (movie.genres) {
    genres = movie.genres.map(genre => genre.name).join(', ');
  }

  let video = "";
  if (movie.videos && movie.videos.results && movie.videos.results[0]) {
    video = (
      <span
        style={{ color: 'blue', cursor: 'pointer' }}
        onClick={() => openVideoModal(movie.videos.results[0].key)}
      >
        {movie.videos.results[0].name}
      </span>
    );
  }

  return (
    <div className="Movie">
      <img src={imageurl} alt={props.movie.original_title} />
      <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br />
      <span className="VideosText">Video: {video}</span>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onRequestClose={closeVideoModal}
        contentLabel="Video Modal"
      >
        <div>
          <YouTube videoId={videoId} />
          <button onClick={closeVideoModal}>X</button>
        </div>
      </Modal>
    </div>
  );
}

export default MovieListItem;
