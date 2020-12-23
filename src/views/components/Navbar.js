const Navbar = {
  render: async () => {
    const view = `
             <nav>
                <a href="/#/">
                    Home
                </a>
                <a href="/#/test">
                    Test
                </a>
                <a href="/#/test2">
                    Test 2
                </a>
                <a href="/#/post/3">
                    Post 3
                </a>
                <a href="/#/register">
                    Register
                </a>
             </nav>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
