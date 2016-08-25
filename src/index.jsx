import React from 'react';
import { render } from 'react-dom';

import renderRouter from './router/index.jsx';

render(renderRouter(), document.querySelector("#app"));
