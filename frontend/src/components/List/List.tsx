import React from 'react';

const MovieEpisodeList = () => {
  const movieEpisodes = [
    { episode: 'Episode 1', title: 'Title of Episode 1' },
    { episode: 'Episode 2', title: 'Title of Episode 2' },
    { episode: 'Episode 3', title: 'Title of Episode 3' },
    { episode: 'Episode 4', title: 'Title of Episode 4' },
    { episode: 'Episode 5', title: 'Title of Episode 5' },
    { episode: 'Episode 6', title: 'Title of Episode 6' },
    { episode: 'Episode 7', title: 'Title of Episode 7' },
    { episode: 'Episode 8', title: 'Title of Episode 8' },
    { episode: 'Episode 9', title: 'Title of Episode 9' },
    { episode: 'Episode 10', title: 'Title of Episode 10' },
  ];
  const divStyle = {
    background: '#222', 
    color: 'white', 
    border: '.0625rem solid #000',
    boxShadow: '.3125rem .3125rem .625rem #888',  
    padding: '.625rem',  
    width: '240px', 
    height: '340px',
  };
  const h2Style = {
    fontSize: '20px', 
    color: 'white', 
    marginBottom: '10px',   
  };
  const hrStyle = {
    margin: '10px 0', 
  };
  const listItemStyle = {
    color: 'pink',    
    fontSize: '12px',
    cursor: 'pointer',
    borderBottom: '0.5px solid black',  
    padding: '2px',           
    transition: 'color 0.3s',
  };
  const buttonStyle ={
    marginTop: '10px', 
    color: 'white',
    fontSize: '12px',
  };
  return (
    <div style={divStyle}>
    <h2 style={h2Style}>Latest Episodes</h2>
    <hr style={hrStyle}/>
      <ul>
        {movieEpisodes.map((episode, index) => (
          <li key={index}style={listItemStyle} >
             <a href="#"></a>
            {episode.episode} - {episode.title}
          </li>
        ))}
      </ul>
      <button style={buttonStyle}>
        More...
      </button>     
    </div>
  );
};

export default function List() {
  return (
    <div>
      <h2>Movie Latest Episodes</h2>
      <MovieEpisodeList />
    </div>
  );
}
