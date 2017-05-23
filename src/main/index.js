import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

import './main.less';
// import defaultSrc from './assets/sample.jpg';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: '',
      width: 320,
      height: 200
    }
  }

  // componentDidMount() {
  //   this.onLoad(defaultSrc);
  // }

  onFileAdded(e) {
    const [ file ] = e.target.files || [];
    const { width, height } = this.state;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => this.onLoad(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  onLoad(src) {
    const { width, height } = this.state;

    this.setState({ src }, () => {
      this.cropper = new Cropper(this.image, {
        aspectRatio: width / height
      });
    });
  }

  download() {
    const { width, height } = this.state;
    const canvas = this.cropper.getCroppedCanvas({ width, height });

    window.location.href = canvas.toDataURL();
  }

  onSizeChange(attr, e) {
    this.setState({ [attr]: e.target.value });
  }

  render() {
    const { src, width, height, cropped } = this.state;

    return (
      <div className="uk-container uk-container-small">
        <h1 className="uk-heading-primary">Обрезка картинок</h1>
        <form className="uk-margin">
          <div className="uk-form-custom">
            <input type="file" id="file" onChange={this.onFileAdded.bind(this)} />
            <button type="button" className={'uk-button uk-button-' + (src ? 'default' : 'primary')}>
              Выберите файл
            </button>
          </div>
          <div className="uk-grid-small uk-child-width-expand@s uk-text-center uk-margin uk-grid">
            <div className="uk-first-column">
              <input className="uk-input"
                     type="text"
                     value={ width }
                     onChange={this.onSizeChange.bind(this, 'width')} />
            </div>
            <div>
              <input className="uk-input"
                     type="text"
                     value={ height }
                     onChange={this.onSizeChange.bind(this, 'height')} />
            </div>
          </div>
          { !src && <div className="empty-image" /> }
          <img ref={ image => this.image = image } src={src} />
          <div className="uk-margin">
            <a href={cropped}
               className={'uk-button uk-button-' + (src ? 'primary' : 'default')}
               onClick={this.download.bind(this)}>
              Обрезать
            </a>
          </div>
        </form>
      </div>
    );
  }
}
