import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");

  // This ⬇
  const open = setOpenName;
  // Is the same as this ⬇
  // const open = (name) => setOpenName(name);
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // We moved the useRef into the outside click hook
  // we made it so that useOutsideclick takes one parameter: 'handler'.
  // this is the funciotn that the hook will call inside the useEffect/addevent listener stuff
  // we then destructure the hook to get the ref property here, so we can assign it to our element
  // we then pass the handler function we want to use to the hook - which is just hte close function that we get from useConetxt
  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;
  /*
  Why you would actually want to use a React Portal to place it in document.body (or some other place):
  It's for reusability, and CSS compatibility.
  The main example would be in the instance of the modal's parent component having "overflow" set to "hidden"
  This would interfere with the modal, and cause it to not show up properly (if at all)
  So rendering it in the dom tree outside of it's Component-tree parent allows us to avoid this.
  */
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* 
          With the cloneElement function, this is essentially letting you append props to a child element.
          
          We're using this in the AddCabin component. The child element is a the CreateCabinForm component. 
          We use the cloneElement function to append the onCloseModal function to the child component.
          It's essentially the same as writing:  <CreateCabinForm onCloseModal={close} />
          We obviously can't write that in the AddCabin component because we don't have access to the close() function.
          So we simply append the the close prop to the child element like so. This way, we can access it in the child component.
         */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
