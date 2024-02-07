import React from "react";
import nyc from "./img/New York City.jpg";
import Background from "./img/New York City.jpg";

// var backgroundStyle = {
//   background: `url(${Background})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   width: "100%",
//   height: "100vh", // Adjust the height as needed
//   display: "inline-block",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
//   color: "white", // Text color
//   fontSize: "24px", // Adjust font size as needed
// };

function HomePage() {

  // const backgroundStyle = {
  //   backgroundImage: `url(${nyc})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   width: "100%",
  //   height: "100vh", // Adjust the height as needed
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   color: "white", // Text color
  //   fontSize: "24px", // Adjust font size as needed
  // };

  const textStyle = {
    position: "absolute", // Position the text relative to the container
    top: "20%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Center both vertically and horizontally
    color: "white", // Text color
    fontSize: "30px", // Adjust font size as needed
    font: "Georgia",
    textAlign: "center", // Center text within the container
  };

  const textStyle2 = {
    position: "absolute", // Position the text relative to the container
    top: "25%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Center both vertically and horizontally
    color: "white", // Text color
    fontSize: "30px", // Adjust font size as needed
    font: "Georgia",
    textAlign: "center", // Center text within the container
  };

  return (
    <div className="home-page">
      <div className="intro-text">

        {/* <h1>Welcome to Your Social Media Platform!</h1> */}
        {/* <p>Connect with friends and share your thoughts!</p> */}
        
        {/* <div
            style = {{
              height: "500px",
              width: "550px",
              backgroundImage:'url("./img/New York City.jpg")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
         >
            <p>This div contains a background image.</p>
         </div> */}


        {/* <div style={{ backgroundImage: "url('./img/New York City.jpg')" }}> 

          <hi>Hello</hi>
        </div> */}




        <div className="background-image">
          <img src={nyc}
           style={{ width: "100%", height: "auto" }} // Adjust width and height as needed
          />
          <h1 style={textStyle}>Welcome to NYC Social Media Platform!</h1>
          {/* <h1 style={textStyle2}>Connect with friends and share your thoughts!</h1> */}
          {/* <p style={textStyle}></p> */}
        </div>

        {/* <div className="home-page" style={backgroundStyle}></div> */}


        {/* <div style={{ backgroundImage: `url(${nyc})` }}></div> */}

        {/* <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}></div> */}


        {/* <div className="image">
          <img src={nyc}/>
        </div> */}



        {/* C:\Users\Kai\Desktop\Github\social-platform\src\img\New York City.jpg */}
      </div>
    </div>
  );
}

export default HomePage;
