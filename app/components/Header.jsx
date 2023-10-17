import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';

export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;

  if (shop.brand.logo !=  null) {
    return (
      <header className="header">
          <div className="container">
           <div className='header-container'>
              <HeaderMenu menu={menu} viewport="desktop"/>
              <NavLink prefetch="intent" to="/" style={activeLinkStyle} className='Header__FlexItem' end>
                <img src={shop.brand.logo.image.url} className="logo" alt={shop.name} loading='lazy' />
              </NavLink>
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
          </div>
      </header>
    );
  } else {
    return (
      <header className="header">
           <div className="container">
            <div className='header-container'>
                <HeaderMenu menu={menu} viewport="desktop" />
                <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
                <strong>{shop.name}</strong>
                </NavLink>
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
           </div>
      </header>
    );
  }

}

export function HeaderMenu({menu, viewport}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport} Header__FlexItem Header__FlexItem--fill`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
   
      {(menu).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <div className="menu_item" key={item.id}>
              <NavLink
              className="header-menu-item menu-link"
              end
              onClick={closeAside}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
              >

              {item.title}

              { item?.items.length > 0 && (
                <div className='dropdown-menu' key={'drowdown--item' + item.id}>
                  {(item).items.map((subitem) => {
                        return (
                        <NavLink
                          className="header-menu-subitem menu-link"
                          end
                          key={subitem.id}
                          to={subitem.url}
                        >
                          {subitem.title}
                        </NavLink>
                        )
                  })}
                </div>
              )}
              </NavLink>
          </div>
     
        );
      })}
    </nav>
  );
}

function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas Header__FlexItem Header__FlexItem--fill" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

function CartBadge({count}) {
  return <a href="#cart-aside">Cart {count}</a>;
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : "normal",
    color: isPending ? 'grey' : 'white',
  };
}
