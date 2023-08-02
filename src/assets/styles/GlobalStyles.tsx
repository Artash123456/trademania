import { isElectron } from 'redux/actions/user_actions';
import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle<{
  is_modal_open: boolean;
  is_navigation_open: boolean;
  theme: Record<string, string>;
}>`
#root{
  background-color: ${({ theme }) => theme.body_color};
  border-radius:${isElectron() ? '8px' : 0}
}
.react-select-container > div {
  background: ${({ theme }) => theme.background_color} !important;
}
.react-select__control {
  background: ${({ theme }) => theme.background_color} !important;
}
.react-select__menu {
  background: ${({ theme }) => theme.dark_input} !important;
  color: ${({ theme }) => theme.font_gray} !important;
}
.edit-widgets {
  > div:first-child {
    background-color: ${({ theme }) => theme.body_color};
  }
  .warn-btn {
    > span:first-child {
      background-color: #e03131;
      color: ${({ theme }) => theme.body_color};
    }
    > span:last-child {
      background-color: #11a267;
      color: ${({ theme }) => theme.body_color};
    }
  }
}
.react-datepicker__input-container >input::placeholder{
  color: ${({ theme }) => theme.font_gray};
}
#container {
  opacity: ${({ is_modal_open }) => (is_modal_open ? '0.05' : '1')};
  pointer-events: ${({ is_modal_open }) => (is_modal_open ? 'none' : 'all')};
  filter: brightness(${({ is_modal_open }) => (is_modal_open ? '0.2' : '1')});
  border-radius: 0;
}
#navigation-mobile {
  opacity: ${({ is_modal_open }) => (is_modal_open ? '0.2' : '1')};
  pointer-events: ${({ is_modal_open }) => (is_modal_open ? 'none' : 'all')};
  filter: brightness(${({ is_modal_open }) => (is_modal_open ? '0.2' : '1')});
  border-radius: 0;
}
.hr {
  background-color: ${({ theme }) => theme.light_gray};
}
#modal-root {
  width: ${({ is_modal_open, is_navigation_open }) =>
    is_modal_open
      ? is_navigation_open
        ? 'calc(100% - 300px)'
        : 'calc(100% - 94px)'
      : '0'};
  height: ${({ is_modal_open }) => (is_modal_open ? '100%' : '0')};
}
::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.body_color};
}
::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.font_gray};
}
.head {
  color: ${({ theme }) => theme.font_light_gray};
}
.social-login-text {
  color: ${({ theme }) => theme.font_gray};
}
h1, h2 {
  color: ${({ theme }) => theme.font_light_gray};
}
h3 {
  color: ${({ theme }) => theme.font_gray};
}
h4 {
  color: ${({ theme }) => theme.light_gray};
}
.button-navigation {
  background: ${({ theme }) => theme.dark_input} !important;
  color: ${({ theme }) => theme.font_gray};
  .active {
    background-color: ${({ theme }) => theme.font_gray};
    color: ${({ theme }) => theme.font_white};
  }
} 
.copy::after {
  background: ${({ theme }) => theme.background_color};
}

p {
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.font_gray};
}
input,
textarea {
  border: none;
  outline: none;
  background: ${({ theme }) => theme.dark_input};
  color: ${({ theme }) => theme.font_gray};
}
input[type='checkbox']:not(:checked) {
  box-shadow: inset 25px 25px ${({ theme }) => theme.dark_input};
} 
.logo > span {
  color: ${({ theme }) => theme.font_light_gray};
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px ${({ theme }) =>
    theme.dark_input} inset !important;
  -webkit-text-fill-color: ${({ theme }) => theme.font_gray} !important;
}
@media(max-width:1250px){
  #navigation{
    opacity: ${({ is_modal_open }) => (is_modal_open ? '0.2' : '1')};
    pointer-events: ${({ is_modal_open }) => (is_modal_open ? 'none' : 'all')};
    filter: brightness(${({ is_modal_open }) => (is_modal_open ? '0.2' : '1')});
    border-bottom-left-radius: ${isElectron() ? '8px' : 0};

  }
  #modal-root {
    width: ${({ is_modal_open }) => (is_modal_open ? '100%' : '0')};
    height: ${({ is_modal_open }) => (is_modal_open ? '100%' : '0')};
  }
}
`;
