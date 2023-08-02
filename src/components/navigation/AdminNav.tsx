import { FC } from 'react';
import { useAppSelector } from 'context';
import { icons } from 'context/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
const AdminNav: FC<{ open: boolean }> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useAppSelector(({ navigation }) => navigation);
  return (
    <DropDown
      open={open}
      path="/admin"
      icon={icons.Admin}
      heading="Admininstrator"
      scroll
    >
      <section>
        {admin.map((item) => (
          <article
            onClick={() => navigate(item.path)}
            key={item.name}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <span>{item.name}</span>
          </article>
        ))}
      </section>
    </DropDown>
  );
};

export default AdminNav;
