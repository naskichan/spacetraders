import Header from "./Header";

interface Props {
    children: React.ReactNode;
    navItems: any[];
}

function BaseComponent(props: Props) {
  return (
    <>
        <Header navItems={props.navItems} />
        {props.children}
    </>

  )
}

export default BaseComponent;