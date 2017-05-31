import { Header } from './header';

export const Layout = ({ children }) => (
  <div>
    <Header>Обрезка картинок</Header>
    <div className="uk-container uk-container-small">
      { children }
    </div>
  </div>
);
