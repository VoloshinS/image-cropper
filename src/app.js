import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/css/uikit.min.css';

import ReactDOM from 'react-dom';
import './style.less';

import { Layout } from './layout';
import Main from './main';

ReactDOM.render(
  <Layout><Main></Main></Layout>,
  document.getElementById('app')
);
