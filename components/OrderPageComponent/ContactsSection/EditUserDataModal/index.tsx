import { ReactNode } from "react";

interface IProps {
  show: boolean
  onClose: () => void
  children: ReactNode;
}

const EditUserDataModal = (props: IProps) => (
  <div>
    {props.show && (
      <div 
      className="
        fixed w-full z-20 h-screen top-0 left-0 p-6 flex justify-center content-center bg-blured
      ">
        {props.children}
      </div>
    )}
  </div>
  )

export default EditUserDataModal
