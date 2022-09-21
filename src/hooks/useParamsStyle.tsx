import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/paramsStyleSlice";
import { IParamsStyle } from "../interface/params";


export interface QueryParamsStyle {
    paramsStyle: IParamsStyle
    setParamsStyle: React.Dispatch<IParamsStyle>
}

export const useParamsStyle = (): QueryParamsStyle => {
    const paramsStyle: IParamsStyle = useAppSelector((state) => state.paramsStyle.params);
    const dispatch = useAppDispatch();
    const setParamsStyle = (params: IParamsStyle) => dispatch(set(params));
    return { paramsStyle, setParamsStyle };
}
