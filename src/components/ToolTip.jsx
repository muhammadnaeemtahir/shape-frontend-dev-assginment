import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IoInformationCircleOutline } from "react-icons/io5";

export const ToolTip = ({ info, classes }) => {
    return (
        <>
            <Tippy content={info}>
                <button className="btn p-0 border-0" type="button">
                    <IoInformationCircleOutline size='1.5em' className={classes} />
                </button>
            </Tippy>
        </>
    )
}
