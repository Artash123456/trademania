import { StyledNavDropDown } from 'assets/styles';
import { useAppDispatch, useClickOutside } from 'context';
import { icons } from 'context/icons';
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
  Ref,
} from 'react';
import { useLocation } from 'react-router-dom';
import { openNavigation } from 'redux/reducers/navigation';

const DropDown: FC<{
  path: string;
  open?: boolean;
  disabled?: boolean;
  className?: string;
  icon: ReactNode | string;
  children: ReactNode;
  heading?: string;
  scroll?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({
  open,
  disabled,
  path,
  className,
  icon,
  children,
  heading,
  scroll,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const scroll_element = document.getElementById('scroll');
  const isActive = location.pathname.startsWith(path);
  const ref: Ref<HTMLDivElement> = useRef(null);
  const openSettings = () => {
    if (open) {
      if (scroll) {
        setIsOpen((p) => {
          setTimeout(() => {
            if (scroll_element && !p)
              scroll_element.scrollTo({ top: 700, behavior: 'smooth' });
          }, 200);
          return !p;
        });
      } else {
        setIsOpen((p) => !p);
      }
    } else if (!disabled) {
      dispatch(openNavigation());
      setIsOpen(true);
    }
  };
  useEffect(() => {
    if (!open && !isActive) setIsOpen(false);
  }, [open, isActive]);
  useClickOutside(ref, setIsOpen);
  return (
    <StyledNavDropDown
      dropDownOpen={isOpen || isActive}
      navbarClosed={!open && !disabled && isActive}
      ref={ref}
      onClick={onClick}
    >
      {' '}
      <div
        className={`main-item ${className}`}
        onClick={() => {
          if (!disabled) openSettings();
        }}
      >
        {icon}
        <span>{heading}</span>
        <span className="arrow"> {icons.ArrowDown}</span>
      </div>
      {open && children}
    </StyledNavDropDown>
  );
};

export default DropDown;
