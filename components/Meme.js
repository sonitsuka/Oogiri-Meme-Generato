import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: " ",
    bottomText: " ",
    randomImage: "https://imgflip.com/s/meme/Success-Kid.jpg"
  });

  const [allMemes, setAllMemes] = React.useState([]);

  const src = meme.randomImage;

  // call images from API. fetch, then. no depencency
  /**
   *     React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
   */
  // for clean tidy code using async in this case
  React.useEffect(async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();
    setAllMemes(data.data.memes);
  }, []);

  // get the image url from the API
  function getMemeImage() {
    // choose random image number
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    // call the url object from the data array data:{memes:[ {url:}]}
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme, // copy all data
      randomImage: url // cahanbe to the new image
    }));
  }

  // show the input text on the image
  function handleChange(evt) {
    const { name, value } = evt.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  function saveMemeImage(src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      // create Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // create <a> tag
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="ownMeme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <button
        className="save--button"
        onClick={() => saveMemeImage(src)}
        src={src}
      >
        Save your own Meme
      </button>
    </main>
  );
}

// control component
