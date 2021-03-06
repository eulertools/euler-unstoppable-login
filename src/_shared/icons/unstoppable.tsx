interface IProps {
  width?: number;
  height?: number;
}

export const UnstoppableIcon = ({ width = 52, height = 48 }: IProps) => (
  <svg
    width={width}
    height={height}
    focusable='false'
    viewBox='0 0 52 48'
    aria-hidden='true'
    data-convert-id='icons_UDLogo_SvgIcon'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M51.6666 1.47125V19.1724L0.333252 40.0919L51.6666 1.47125Z'
      fill='#2FE9FF'
      data-convert-id='icons_UDLogo_path'
    ></path>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M42.0416 0.666656V31.2414C42.0416 40.1287 34.8595 47.3333 25.9999 47.3333C17.1404 47.3333 9.95825 40.1287 9.95825 31.2414V18.3678L19.5833 13.0575V31.2414C19.5833 34.3519 22.097 36.8736 25.1978 36.8736C28.2987 36.8736 30.8124 34.3519 30.8124 31.2414V6.86206L42.0416 0.666656Z'
      fill='#4C47F7'
      data-convert-id='icons_UDLogo_path_2'
    ></path>
  </svg>
);
