import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";
import { IoIosSearch } from "react-icons/io";

import css from "./SearchBar.module.css";
import { searchValidator} from "../../validators/board.validator.ts";
import {ROUTER_KEYS} from "../../constants/app-keys.const.ts";

interface IFormProps {
    _id: string,
}

const SearchBar: FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<IFormProps>(
        {mode: "all", resolver: joiResolver(searchValidator)}
    );

    const find: SubmitHandler<IFormProps> = (formValue: IFormProps): void => {
        navigate(`${ROUTER_KEYS.BOARDS}/${formValue._id}/${ROUTER_KEYS.CARDS}`);
        reset();
    }
    return (
        <div className={css.searchBarContainer}>
            <form className={css.searchBar} onSubmit={handleSubmit(find)}>
                <input className={css.searchInput} type="text"{...register('_id')}/>
                {
                    errors._id && <span>{errors._id.message}</span>
                }
                <button className={css.searchButton} disabled={!isValid}><IoIosSearch className={css.searchIcon}/></button>
            </form>

        </div>
    );
};

export {SearchBar};