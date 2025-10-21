import React from "react";

const Link = ({ href, children, ...rest }) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default Link;