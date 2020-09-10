import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.css";
import { useSpring, a } from "react-spring/three";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";
import logo from "./Intuitive_Surgical_logo.svg";
import { Navbar, Nav } from "react-bootstrap";

const SpinningMesh = ({ position, color, speed, args }) => {
  const mesh = useRef();

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  console.log(expand);


  return (

    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow>
      <boxBufferGeometry attach='geometry' args={args} />
      <meshStandardMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6}


      />
    </a.mesh>

  );
};

const App = () => {
  const [usecolor, setUsecolor] = React.useState({
    colorName: ""
  });
  const { colorName } = usecolor;
  const onInputChange = e => {
    setUsecolor({ [e.target.name]: e.target.value })

  };
  console.log(colorName);

  return (
    <>

      <div>

        <Router>
          <Navbar bg="light" expand="lg">
            <div className="container">
              <Link className="navbar-brand" exact to="/"><img className="App-logo" src={logo} alt="logo" /></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLink className="nav-link" exact to="/">Home</NavLink>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>


        </Router>

        <div className="container">
          <div className="form-group py-4">
            <select className="form-control form-control-lg" name="colorName" onChange={e => onInputChange(e)} required>
              <option value=" ">Select Color</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="black">Black</option>
            </select>

          </div>

        </div>

      </div>


      <Canvas
        colorManagement
        camera={{ position: [-50, 2, 10], fov: 60 }}>

        <ambientLight intensity={0.3} />

        <SpinningMesh
          position={[0, 1, 0]}
          color={colorName}
          args={[5, 5, 5]}
          speed={2}
        />






      </Canvas>
    </>
  );
};

export default App;
