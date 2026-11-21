import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/utils';

const NavLink = ({ href, children, className, onClick }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isHashLink = href.startsWith('/#') || href.startsWith('#');
  const isActive = !isHashLink && (pathname === href || (href !== '/' && pathname.startsWith(href)));

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'transition-colors duration-200 text-sm lg:text-base text-gray-600 hover:text-rose-500',
        className,
        isActive && 'text-rose-500 font-medium'
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
