import './header.less';

export const Header = ({ children }) => (
  <div className="vs-header">
    <div className="uk-container uk-container-small">
      <a className="vs-logo" href="#">{ children }</a>
    </div>
  </div>
);
