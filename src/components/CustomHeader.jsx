import React from "react";

const CustomHeader = ({ as, className, text, ...restProps }) => {
  const HeaderTag = as || "h1"; // Default to h1 if no 'as' prop is provided
  return (
    <HeaderTag className={className} {...restProps}>
      {text}
    </HeaderTag>
  );
};

export default CustomHeader;
