import { Button } from '../Button';

export const FileButton = ({ id, onChange, btnType, children }) => (
  <div className="uk-form-custom uk-form-custom-file">
    <input type="file" id={ id } onChange={ onChange } />
    <Button btnType={ btnType }>
      { children }
    </Button>
  </div>
);
