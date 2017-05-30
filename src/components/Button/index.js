export const Button = ({ children, onClick, btnType, disabled = false }) => (
  <button type="button"
          disabled={disabled}
          onClick={onClick}
          className={`uk-button uk-button-${ btnType }`}>
    { children }
  </button>
);
