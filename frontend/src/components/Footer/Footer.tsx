import {FC} from 'react';

import css from "./Footer.module.css";

interface IProps {

}

const Footer: FC<IProps> = () => {

    return (
        <div className={css.Footer}>
            2024
        </div>
    );
};

export {Footer};
