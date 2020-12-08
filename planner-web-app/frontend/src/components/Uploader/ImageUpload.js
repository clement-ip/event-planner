import React from "react";

const API_ADDR = process.env.NODE_ENV === 'production' ?
                    process.env.REACT_APP_IMG_API_ADDR_PRODUCTION :
                    process.env.REACT_APP_IMG_API_ADDR_DEV;


function ImageUpload(){

  function Post(e){
    e.preventDefault();
    const file = document.getElementById("inputGroupFile01").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    fetch('/upload', {
      method: "POST",
      body: formData
    }).then(r => {
      console.log(r);
    });

    document
      .getElementById("img")
      .setAttribute("src", `${API_ADDR}/${file[0].name}`);
    console.log(file[0]);
  };


    return (
      <div className="container">
        {/* <div className="jumbotron">
          <h1 className="display-4">Image Uplaoder</h1>
          <p className="lead">
            This is a simple application to upload and retrieve images from a
            database
          </p>
          <hr className="my-4" />
        </div> */}
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={Post}>
          Upload
        </button>
        <img
          id="img" alt=""
          style={{
            display: "block"
          }}
        ></img>
      </div>
    );

}

export default ImageUpload;
