import React from "react";
import { hydrateRoot } from 'react-dom/client';
import App from "../view/App";

const props = {
    name: "Jane",
  };
  

hydrateRoot(document.getElementById('app'), <App {...props} />);