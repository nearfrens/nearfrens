import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/paramsStyleSlice";
import { IParamsStyle } from "../interface/params";


export const useParamsStyle = (): [IParamsStyle, React.Dispatch<IParamsStyle>] => {
    const state: IParamsStyle = useAppSelector((state) => state.paramsStyle.params);
    const dispatch = useAppDispatch();
    const setState = (params: IParamsStyle) => dispatch(set(params));
    return [state, setState];
}
