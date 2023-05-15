interface Props {
  className: string;
}
const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={className}>
      <span className="text-xs" style={{ color: "rgb(104, 112, 118)" }}>
        Copyright © 2022. All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
