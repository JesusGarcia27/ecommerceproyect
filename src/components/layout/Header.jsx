import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeIsShowCart } from "../../store/slices/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationCount } from "../../store/slices/userInfo.slice";

const Header = ({setIsDark}) => {
  const { token } = useSelector((store) => store.userInfo);
  const { notificationCount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickChangeShowCart = () => {
    if (!token) return navigate("/login");
    dispatch(changeIsShowCart());
    dispatch(setNotificationCount());
  };

  const handleChangeTheme = () => {
    setIsDark((isDark) => !isDark)
  }


  return (
    <section className="px-2 pb-4 dark:bg-white/20 dark:sm:h-28 ">
      <Link to="/">
        <div className="relative ">
          <img className="absolute -mt-2 -ml-8 w-[130px] lg:ml-6 lg:-mt-2 sm:-mt-2 " src="/images/black.png" alt="" />
        </div>
      </Link>

      <nav className="flex justify-between ml-32 mt-6 px-2 sm:relative dark:hover:text-blue-600 ">

        <i onClick={handleChangeTheme} class='bx bxs-moon absolute mt-6 -ml-6 lg:right-[490px] cursor-pointer'></i>
        <Link to="/login">
          <i className="bx bx-user text-2xl text-gray-500/70 sm:absolute sm:right-80 p-4 lg:px-8 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 "></i>
        </Link>

        <Link to="/purchase">
          <i className="bx bx-box text-2xl text-gray-500/70 sm:absolute sm:right-44 p-4 lg:px-8 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 "></i>
        </Link>

        <button onClick={handleClickChangeShowCart} className="relative">
          <i className="bx bx-cart text-2xl text-gray-500/70 sm:absolute sm:right-0 lg:right-8 p-4 lg:px-8 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 ">
            {notificationCount > 0 && (
              <span className="absolute top-2 right-4 bg-blue-600 text-white rounded-full px-2 py-1  text-xs hover:bg-blue-300 ">
                {notificationCount}
              </span>
            )}
          </i>
        </button>
      </nav>
    </section>
  );
};

export default Header;