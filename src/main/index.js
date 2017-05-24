import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

import './main.less';

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
      const name = file.name.replace(/\.\w+$/, '');
      const reader = new FileReader();

      reader.onload = (e) => this.onLoad(e.target.result, name);
      reader.readAsDataURL(file);
    }
  }

  onLoad(src, name = 'image') {
    const { width, height } = this.state;

    this.setState({ src, name: `${ name }_cropped` }, () => {
      if (this.cropper) {
        this.cropper.destroy();
      }

      this.cropper = new Cropper(this.image, {
        aspectRatio: width / height
      });
    });
  }

  download() {
    const { width, height } = this.state;
    const canvas = this.cropper.getCroppedCanvas({ width, height });

    this.setState({href: canvas.toDataURL()}, () => {
      this.downloadBtn.click();
    });
  }

  onSizeChange(attr, e) {
    this.setState({ [attr]: e.target.value });
  }

  render() {
    const { src, width, height, cropped, href, name } = this.state;

    return (
      <div className="uk-container uk-container-small">
        <h1 className="uk-heading-primary">Обрезка картинок</h1>
        <form className="uk-margin">
          <div className="uk-form-custom uk-form-custom-file">
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
        </form>
        <div className="uk-margin">
          <button disabled={!src}
             className={'uk-button uk-button-' + (src ? 'primary' : 'default')}
             onClick={this.download.bind(this)}>
            Обрезать
          </button>
          <a ref={(el) => this.downloadBtn = el} href={href} download={name} />
        </div>
      </div>
    );
  }
}
