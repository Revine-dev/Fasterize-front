const Cloud = ({ color }) => {
  const colors = {
    green: "#6ab420",
    orange: "#FF8C00",
    red: "#ff0000",
  };

  let selectedColor = colors.green;

  if (color && colors[color]) {
    selectedColor = colors[color];
  }

  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="956.699px"
      height="956.699px"
      viewBox="0 0 956.699 956.699"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M782.699,413.199c-0.199,0-0.299,0-0.5,0c-7.699-121.7-108.898-218-232.5-218c-114.099,0-209,82-229.099,190.2
    c-2.601-0.1-5.3-0.2-7.9-0.2c-85,0-156.7,56.3-180.1,133.6c-3.6-0.299-7.3-0.5-11-0.5c-67.1,0-121.6,54.4-121.6,121.6
    C0,707.1,54.4,761.5,121.5,761.5c1,0,661.1,0,661.1,0c96.201,0,174.1-78,174.1-174.102
    C956.699,491.299,878.9,413.199,782.699,413.199z"
          fill={selectedColor}
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};

export default Cloud;