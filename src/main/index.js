import Cropper from 'cropperjs';
import { Button } from '../components/Button';
import { FileButton } from '../components/FileButton';
import 'cropperjs/dist/cropper.min.css';

import './main.less';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 320,
      height: 200
    };
  }

  onFileAdded(e) {
    const [ file ] = e.target.files || [];

    if (!file) { return; }

    const name = file.name.replace(/\.\w+$/, '');
    const reader = new FileReader();

    reader.onload = (ev) => this.onLoad(ev.target.result, name);
    reader.readAsDataURL(file);
  }

  onLoad(src, fileName = 'image') {
    const name = `${ fileName }_cropped`;

    this.setState({ src, name }, this.createCropper.bind(this));
  }

  createCropper() {
    const { width, height } = this.state;

    this.cropper && this.cropper.destroy();
    this.cropper = new Cropper(this.image, {
      aspectRatio: width / height
    });
  }

  download() {
    const { width, height } = this.state;
    const canvas = this.cropper.getCroppedCanvas({ width, height });

    this.setState({ href: canvas.toDataURL() }, () => {
      this.downloadBtn.click();
    });
  }

  onSizeChange(attr, e) {
    this.setState({ [attr]: e.target.value });
  }

  render() {
    const { src, width, height, href, name } = this.state;

    return (
      <div>
        <form className="uk-margin">
          <FileButton id="file"
                      onChange={ this.onFileAdded.bind(this) }
                      btnType={ src ? 'default' : 'primary' }>
            Выберите файл
          </FileButton>
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
          <Button disabled={!src}
                  onClick={this.download.bind(this)}
                  btnType={src ? 'primary' : 'default'}>
            Обрезать
          </Button>
          <a ref={(el) => this.downloadBtn = el} href={href} download={name} />
        </div>
      </div>
    );
  }
}
